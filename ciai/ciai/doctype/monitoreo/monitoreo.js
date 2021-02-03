// Copyright (c) 2019, XERP and contributors
// For license information, please see license.txt
// <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAMpdNUsaTWYFV58yaxVKzg4lHWUWeNgWs&callback=initMap"
// type="text/javascript"></script>

frappe.ui.form.on('Monitoreo', {
	onload: function(frm) {
		$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAMpdNUsaTWYFV58yaxVKzg4lHWUWeNgWs&callback=initMap")
	},
	refresh: function(frm) {
		estaciones()
	}
});

var estaciones = function(frm){
	// let est = frappe.db.get_list('Estacion', {fields: ['name','estatus','lat','lng','ciclo'], limit: 20}) //otra forma de hacerlo
	var est
	frappe.call({
		method: "ciai.api.get_estaciones_estatus",
		args: {
			user: frappe.user.name
		},
		callback: function (data) {
			// console.log(data.message)
			est = data.message
			initMap(est)
		}
	});
}

var initMap = function(est){
	// console.log(est)
	var map = new google.maps.Map(document.getElementById('googleMap'), {
		center:new google.maps.LatLng(20.666594,-103.353072),
		// disableDefaultUI: true,
		zoom:9
  });

  setMarkers(map,est);
}

var setMarkers = function(map,est){
	$(est).each(function(){
			var marker = new google.maps.Marker({
		      position: { lat: this.lat, lng: this.lng },
		      map: map,
					icon: { url: "https://maps.google.com/mapfiles/ms/icons/" + this.color + "-dot.png"  },
		      label: this.nombre,
		      title: this.nombre
		    });

			google.maps.event.addListener(marker,'click',function() {
				$(cur_frm.fields_dict.tabla_html.wrapper).empty();
				// let estacion = this.nombre
				frappe.call({
					method: "ciai.api.get_lect",
					args: {
						estacion: marker.label
					},
					callback: function(r) {
						// frm.events.get_marks(frm, r.message);
						console.log('get_lect:: ', r.message)
						var result_table = $(frappe.render_template('lecturas', {
							lecturas: r.message
						}) )
						result_table.appendTo(cur_frm.fields_dict.tabla_html.wrapper);
					}
				});
				// var infowindow = new google.maps.InfoWindow({ //para mostrar los detalles del marker en un infowindow
			  // content: marker.label   + marker.position
				// });
				// infowindow.open(map,marker);
			});
	});


}
