// Copyright (c) 2019, XERP and contributors
// For license information, please see license.txt

frappe.ui.form.on('Monitoreo Lista', {
	estacion: function(frm) {
		frappe.call({
			method: "ciai.api.fuera_rango",
			args: {
				estacion: frm.doc.estacion
			},
			callback: function(r) {
				console.log(r.message)
				var result_table = $(frappe.render_template('monitoreo_lista', {
					lecturas: r.message
				}) )
				result_table.appendTo(cur_frm.fields_dict.tabla_html.wrapper);
			}
		});

	},
	refresh: function(frm) {

	}
});
