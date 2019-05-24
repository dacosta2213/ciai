// Copyright (c) 2019, XERP and contributors
// For license information, please see license.txt

frappe.ui.form.on('Ciclo', {
	aprobar: function(frm) {
		frm.set_value("acuerdo", 1)
		frm.save()
	},
	refresh: function(frm) {
		if (!frm.doc.__islocal) {
				frappe.call({
					method: "ciai.api.get_lect",
					args: {
						estacion: frm.doc.estacion
					},
					callback: function(r) {
						console.log(r.message)
						var result_table = $(frappe.render_template('lecturas', {
							lecturas: r.message
						}) )
						result_table.appendTo(cur_frm.fields_dict.tabla_html.wrapper);
					}
				})
		}

		$('.btn[data-fieldname=aprobar]').addClass('btn-primary');
	}
});
