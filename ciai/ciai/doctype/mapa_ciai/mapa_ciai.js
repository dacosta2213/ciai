// Copyright (c) 2019, XERP and contributors
// For license information, please see license.txt

frappe.ui.form.on('Mapa CIAI', {
	refresh: function(frm) {
		frappe.call({
			method: "ciai.api.get_estaciones",
			callback: function (data) {
				console.log(data.message);
				cur_frm.set_value('mapa', data.message );
			}
		});

		$('#unique-0').css({ "min-height":"900px"});
		$('.page-head').hide();
		setInterval(function() { location.reload(); }, 6000000);
	}
});
