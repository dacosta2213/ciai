// Copyright (c) 2019, XERP and contributors
// For license information, please see license.txt

frappe.ui.form.on('Valores CIAI', {
	refresh: function(frm) {

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
 					data: {
 						datasets: [ { values: resultados.map(d=>d.field1) } ],
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
