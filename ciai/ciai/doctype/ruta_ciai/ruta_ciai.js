// Copyright (c) 2019, XERP and contributors
// For license information, please see license.txt

frappe.ui.form.on('Ruta CIAI', {
	refresh: function(frm) {
		frappe.call({
			method: "ciai.api.get_estaciones",
			callback: function (data) {
				console.log(data.message);
				cur_frm.set_value('mapa', data.message );
			}
		});

		$('#unique-0').css({ "min-height":"600px"});
		$('.page-head').hide();
		setInterval(function() { location.reload(); }, 6000000);
 },
 estacion: function(frm) {
// RG-Para construir el chart
		frappe.call({
			method: "ciai.ciai.doctype.ruta_ciai.ruta_ciai.datos",
			args: {
				contenedor: cur_frm.doc.estacion
				},
			callback: function (r) {
				let results = r.message || [];
				let resultados = results.slice(0, 10);

				let field1 = {
					parent: '.field1',
					title: 'Temperatura',
					// subtitle:"Los valores normales varían entre 90 y 130 mmHg",
					data: {
						datasets: [ { values: resultados.map(d=>d.field1) } ],
						// specific_values : [
						// 	{
						// 		title: 'MIN',
						// 		line_type: "dashed",
						// 		value: cur_frm.doc.min1
						// 	},
						// 	{
						// 		title: 'MAX',
						// 		line_type: "dashed",
						// 		value: cur_frm.doc.max1
						// 	},
						// ],
						labels: resultados.map(d=>d.creation)
					},
					colors: ['#ffd967'],
					type: 'line', // or 'bar', 'line', 'pie', 'percentage', 'scatter'
					height: 250
				};
				new Chart(field1);

				let field2 = {
					parent: '.field2',
					title: 'Humedad',
					// subtitle:"Los valores normales varían entre 90 y 130 mmHg",
					data: {
						datasets: [ { values: resultados.map(d=>d.field2) } ],
						labels: resultados.map(d=>d.creation)
					},
					colors: ['blue'],
					type: 'line', // or 'bar', 'line', 'pie', 'percentage', 'scatter'
					height: 250
				};
				new Chart(field2);

			}
		});
	}
});
