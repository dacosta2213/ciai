frappe.ui.form.on("Sales Invoice", {
    onload:function(frm){
    	if(localStorage.status = "Cerrado" || !localStorage.status){
    		swal({
			  title: 'No hay turno abierto!',
			  text: "Abre un turno para utilizar la caja",
			  type: 'warning',
			  showCloseButton: false
			}).then((result) => {
			  if (result.value) {
			    window.location.href = "#List/Turno/List";
			  }
			});

    	}

    },
     onload_post_render: function(frm) {
    	// LAYOUT 
		$('.layout-side-section').hide();
		$('.form-dashboard').hide();
		$('.layout-main-section-wrapper').attr("class", "col-md-12");
		$("[data-fieldname='title']").parent().parent().attr("class", "form-column col-sm-3");
		$("[data-fieldname='update_stock']").parent().parent().attr("class", "form-column col-sm-9");
		$( ".title-text" ).prepend( '<span class="fa fa-gift" style="margin-right: 10px;"></span>');

		cur_frm.set_value('tipo_de_cambio', localStorage.tipo_de_cambio);
		cur_frm.set_value('caja', localStorage.caja);
		cur_frm.set_value('vendedor_principal', localStorage.vendedor_principal);
		cur_frm.set_query("vendedor_principal", function() {
	        	return {
					"filters": { "vendedor": 1 }
	        	};
			});

		if (cur_frm.doc.is_return){
			$("[data-fieldname=qty]").css({ "font-size":16, "font-weight":"bold","color":"#ff5858"})
			$("[data-fieldname=amount]").css({ "font-size":16, "font-weight":"bold","color":"#ff5858"})
		}
    },

    validate:function(frm){
    	cur_frm.set_value('is_pos',1);
cur_frm.set_value("atendido_por",frappe.user.full_name());

    },
    on_submit: function(frm) {
		this.frm.msgbox = frappe.msgprint(
		`<a class="btn btn-primary" onclick="cur_frm.print_preview.printit(true)" style="margin-right: 5px;">
			<span class="glyphicon glyphicon-print"></span><br>Imprimir Recibo</a>
		<a class="btn btn-success" href="/printview?doctype=Sales%20Invoice&name=`+cur_frm.doc.name+`&trigger_print=1&format=Ticket%20de%20Regalo&no_letterhead=0&_lang=es" style="margin-right: 5px;">
			<span class="glyphicon glyphicon-gift"></span> <br>Recibo de Regalo</a>
		<a class="btn btn-info" href="javascript:cur_frm.email_doc();" style="margin-right: 5px;">
			<span class="glyphicon glyphicon-send"></span> <br>Enviar por email</a>
		<a class="btn btn-default" href="javascript:frappe.new_doc(cur_frm.doctype);">
		<span class="glyphicon glyphicon-repeat"></span> <br>Nuevo Recibo</a>`,
		'Selecciona tipo de comprobante'
		);
	},
cobrar_apartado: function(frm) {
		
		erpnext.utils.map_current_doc({
			method: "erpnext.selling.doctype.sales_order.sales_order.make_sales_invoice",
			source_doctype: "Sales Order",
			target: cur_frm,
			setters: {
				customer: cur_frm.doc.customer || undefined,
			},
			get_query_filters: {
				docstatus: 1,
				status: ["!=", "Closed"],
				per_billed: ["<", 99.99],
				company: cur_frm.doc.company
			}
		})
	},
    refresh: function(frm) {
	cur_frm.msgbox.show();
	console.log('beibi');
	
    	// $(".grid-add-row").prepend( '<span class="octicon octicon-plus" style="margin-right: 5px;"></span>');
    	// $( "h6:contains('Payments')" ).css({ "font-size":14, "font-weight":"bold","color":"#57B322"}).prepend( '<span class="glyphicon glyphicon-credit-card"></span>');
   
    }	
})

