$(document).ready(function() {
	//CARGAR LOS TEMPLATES para el header
	$('header').prepend(frappe.render_template("logo"));
	$('header .navbar .container').prepend(frappe.render_template("sidebar-toggle"));
	// console.log('Totall nuevo');
	$('.main-section').append(frappe.render_template("xerp"));
	$('#help-links').parent().append(frappe.render_template("ayuda"));
	$(".js-modal-btn").modalVideo();

	//PERSONALIZACION DEL HEADER
	$('header').addClass('main-header');
	$('header .navbar').removeClass('navbar-fixed-top');
	$('body').addClass('skin-blue sidebar-mini sidebar-collapse');
	$('#body_div').addClass('content-wrapper');

	// RG-Pa borrar los items del help menu
	// $("#navbar-search").hide();
	$("[data-link-type=documentation]").hide();
	$("[data-link-type=forum]").hide();
	$("[href='https://gitter.im/frappe/erpnext']").hide();
	$("[href='#background_jobs']").hide();
	$("[href='https://github.com/frappe/erpnext/issues']").hide();
	$("[onclick='return frappe.ui.toolbar.show_about();']").hide()
	$("[rel='noopener noreferrer']").hide();

	// RG- Borrar el icono de explore
	$("[data-name='Explore']").hide();
	$("[href='https://erpnext.com?source=website_footer']").hide();

	// $('.navbar-nav > li > .dropdown-menu').append(frappe.render_template("ayuda"));


	// RG- IConos para cuando no hay resultados y otros eventos
	robot = "/assets/xerp/images/robot1.svg";
	$('.no-result').prepend('<img class="message-page-image" src=robot width="20%">');

	// posix.set_user_background();

	// FORMATTERS   - ejemplos - https://frappe.io/docs/user/en/guides/desk/formatter_for_link_fields
	frappe.form.link_formatters['Patient'] = function(value, doc) {
		if(doc && doc.patient_name && doc.patient_name !== value) {
			return value? value + ': ' + doc.patient_name: doc.patient_name;
		} else {
			return value;
		}
	}
});

	// crisp.io
	//window.$crisp=[];window.CRISP_WEBSITE_ID="20268af8-fa31-405d-9563-70e22826a2e6";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
	window.$crisp=[];window.CRISP_WEBSITE_ID="b442aa50-6807-41aa-a973-eba7112ffc7d";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
frappe.provide("xerp");

frappe.templates["logo"] = '<div data-toggle="offcanvas" role="button">'
+'<a href="/desk#List/Patient Appointment/Calendar" class="logo">'
+'<span class="logo-mini"><b>bd</b></span>'
+'<span class="logo-lg"><b>bdoop</b></span>'
+'</a></div>';

frappe.templates["sidebar-toggle"] = '';

frappe.templates["ayuda"] = '<li><a></a></li>'
+'<li class="divider documentation-links"></li>'
// +'<li><a href="https://www.youtube.com/playlist?list=PLnzRJvOjHWWI7DgtvB1t5Xxa2J3n1Zwcv" target="_blank">Videos de Ayuda</a></li>'
+'<li><a href="http://Totall.mx">Enviar Mail a Soporte</a></li>'
+'<li><a href="http://Totall.mx" target="_blank">Abrir Ticket de Soporte</a></li>'
+ '<li class="divider documentation-links"></li>'
// + '<li><a href="https://api.whatsapp.com/send?phone=526868411224&text=Necesito%20ayuda!" target="_blank">Ayuda por WhatsApp</a></li>'
// +'<li><a href="https://appear.in/posix" target="_blank">Soporte Remoto (Usar Chrome)</a></li>'
+ '<li class="divider documentation-links"></li>'
+'<li><a href="http://Totall.mx">Desarrollado por Totall.MX</a><a>Horario de Soporte de 8 AM a 5 PM</a></li>';


// if (frappe.user.has_role('Supplier')) {
// 	frappe.templates["Totall"] = '<aside class="main-sidebar">'
// 	 +'	<section class="sidebar">'
// 	 +'      <ul class="sidebar-menu">'
// 	 +'        <li class="header">NAV. PRINCIPAL</li>'
// 	 +'        <li><a href="#dashboard-Totall"><i class="fas fa-home"></i></a></li>'
//
//
//
// 	 +'        <li class="treeview">'
// 	 +'          <a href="#">'
// 	 +'            <i class="far fa-money-bill-alt"></i>'
// 	 +'            <span>Ventas</span>'
// 	 +'            <span class="pull-right-container">'
// 	 +'              <i class="fa fa-angle-left pull-right"></i>'
// 	 +'            </span>'
// 	 +'          </a>'
// 	 +'          <ul class="treeview-menu">'
// 	 +'            <li><a href="#List/Turno/List"><i class="fas fa-flag"></i>  Turnos</a></li>'
// 	 +'            <li><a href="#pov"><i class="far fa-money-bill-alt"></i>  Punto de Venta</a></li>'
// 	 +'            <li><a href="#Form/Sales Invoice/Nuevo Factura de venta 1"><i class="fas fa-plus-circle"></i>  Nueva Venta</a></li>'
// 	 +'            <li><a href="#List/Sales Invoice/List"><i class="fas fa-chart-bar"></i>  Historial de Venta</a></li>'
// 	 +'            <li><a href="#List/Sales Order/List"><i class="fas fa-birthday-cake"></i>  Apartados</a></li>'
// 	 +'          </ul>'
// 	 +'        </li>'
//
// 	 +'    </ul>'
// 	 +'    </section>'
// 	 +'  </aside>'
// 	 +'<div class="overlay"><div>' ;
//
//
//  } else {



frappe.templates["xerp"] = '<aside class="main-sidebar">'
 +'	<section class="sidebar">'
 +'      <ul class="sidebar-menu">'
 +'        <li class="header">NAV. PRINCIPAL</li>'
 +'        <li><a href="#Form/Monitoreo"><i class="fas fa-home"></i></a></li>'


 +'        <li class="treeview">'
 +'          <a href="#">'
 +'            <i class="fas fa-thermometer-quarter"></i>'
 +'            <span>GALLINAZA</span>'
 +'            <span class="pull-right-container">'
 +'              <i class="fa fa-angle-left pull-right"></i>'
 +'            </span>'
 +'          </a>'
 +'          <ul class="treeview-menu">'
 +'            <li><a href="#List/OAuth%20Client/List"><i class="octicon octicon-plus"></i>   Inscripcion Clientes</a></li>'
 +'            <li><a href="#List/Ciclo"><i class="octicon octicon-plus"></i>   Ciclos</a></li>'
 +'            <li><a href="#List/Especie"><i class="octicon octicon-plus"></i>   Especie</a></li>'
 +'            <li><a href="#List/Estacion/List"><i class="octicon octicon-plus"></i>   Estaciones</a></li>'
 +'            <li><a href="#List/Lectura/List"><i class="octicon octicon-plus"></i>   Lecturas</a></li>'
 +'            <li><a href="#Form/Monitoreo"><i class="octicon octicon-plus"></i>   Mapa</a></li>'
 +'            <li><a href="#Form/Monitoreo Lista"><i class="octicon octicon-plus"></i>   Tablero</a></li>'
 +'            <li><a href="https://ciai.totall.mx/api/method/ciai.api.addlectura?estacion=gallina1&field1=55&field2=32&lat=20.658080000&lng=-103.302920000&bat=BAJA"><i class="octicon octicon-plus"></i>   API</a></li>'
 +'          </ul>'
 +'        </li>'


 +'        <li class="treeview">'
 +'          <a href="#">'
 +'            <i class="far fa-money-bill-alt"></i>'
 +'            <span>INGRESOS</span>'
 +'            <span class="pull-right-container">'
 +'              <i class="fa fa-angle-left pull-right"></i>'
 +'            </span>'
 +'          </a>'
 +'          <ul class="treeview-menu">'
 +'            <li><a href="#List/Turno/List"><i class="fas fa-flag"></i>  Turnos</a></li>'
 +'            <li><a href="#pov"><i class="far fa-money-bill-alt"></i>  Punto de Venta</a></li>'
 +'            <li><a href="#Form/Sales Invoice/Nuevo Factura de venta 1"><i class="fas fa-plus-circle"></i>  Nueva Venta</a></li>'
 +'            <li><a href="#List/Sales Invoice/List"><i class="fas fa-chart-bar"></i>  Historial de Venta</a></li>'
 +'            <li><a href="#List/Sales Order/List"><i class="fas fa-birthday-cake"></i>  Apartados</a></li>'
 +'          </ul>'
 +'        </li>'
 //
 //
 //
 +'        <li class="treeview">'
 +'          <a href="#">'
 +'            <i class="fas fa-bolt"></i>'
 +'            <span>CFDI</span>'
 +'            <span class="pull-right-container">'
 +'              <i class="fa fa-angle-left pull-right"></i>'
 +'            </span>'
 +'          </a>'
 +'          <ul class="treeview-menu">'
 +'            <li><a href="#List/CFDI/List"><i class="far fa-money-bill-alt"></i>   Facturas</a></li>'
 +'            <li><a href="#List/CFDI Clave Producto/List"><i class="octicon octicon-plus"></i> Clave Producto</a></li>'
 +'            <li><a href="#List/CFDI Clave Unidad/List"><i class="fas fa-plus-circle"></i>  Clave Unidad</a></li>'
	+'            <li><a href="#List/Configuracion CFDI/List"><i class="fa fa-cog"></i>  Configurar</a></li>'
 +'          </ul>'
 +'        </li>'


 +'        <li class="treeview">'
 +'          <a href="#">'
 +'            <i class="fas fa-cubes"></i>'
 +'            <span>INVENTARIO</span>'
 +'            <span class="pull-right-container">'
 +'              <i class="fa fa-angle-left pull-right"></i>'
 +'            </span>'
 +'          </a>'
 +'          <ul class="treeview-menu">'
 +'            <li><a href="#List/Item/List"><i class="octicon octicon-package"></i>  Productos</a></li>'
 +'            <li><a href="#List/Stock Reconciliation/List"><i class="fa fa-circle-o"></i>  Ajustes</a></li>'
 +'            <li><a href="#List/Stock Entry/List"><i class="octicon octicon-plus"></i>  Movimientos</a></li>'
 +'            <li><a href="#stock-balance"><i class="octicon octicon-screen-full"></i>  Estatus/Producto</a></li>'
 // +'            <li><a href="#List/Captura Inventario/List"><i class="octicon octicon-screen-normal"></i> Captura Lector</a></li>'
 +'          </ul>'
 +'        </li>'


 +'        <li class="treeview">'
  +'          <a href="#">'
  +'            <i class="fas fa-female"></i>'
  +'            <span>VENTAS</span>'
  +'            <span class="pull-right-container">'
  +'              <i class="fa fa-angle-left pull-right"></i>'
  +'            </span>'
  +'          </a>'
  +'          <ul class="treeview-menu">'
  +'            <li><a href="#List/Quotation/List"><i class="fa fa-table"></i>  Cotizaciones</a></li>'
  +'            <li><a href="#List/Sales%20Invoice/List"><i class="octicon octicon-plus"></i>  Ventas</a></li>'
  +'            <li><a href="#List/Delivery Trip/List"><i class="far fa-envelope"></i>  Entregas</a></li>'
  // +'            <li><a href="#en-construccion"><i class="fas fa-birthday-cake"></i>  Boletines</a></li>'
  +'            <li><a href="#List/Installation Note/List"><i class="fas fa-briefcase"></i>  Nota de Instalacion</a></li>'
  +'            <li><a href="#List/SMS%20Envio/List"><i class="fas fa-bullhorn"></i>  SMS Envio</a></li>'
  +'          </ul>'
  +'        </li>'


	+'        <li class="treeview">'
	 +'          <a href="#">'
	 +'            <i class="far fa-address-card"></i>'
	 +'            <span>CRM</span>'
	 +'            <span class="pull-right-container">'
	 +'              <i class="fa fa-angle-left pull-right"></i>'
	 +'            </span>'
	 +'          </a>'
	 +'          <ul class="treeview-menu">'
	 +'            <li><a href="#List/Lead/List"><i class="fas fa-female"></i>  Prospecto</a></li>'
	 +'            <li><a href="#List/Opportunity/Kanban/Oportunidades%20por%20Estado"><i class="far fa-envelope"></i>  Oportunidad</a></li>'
	 +'            <li><a href="#List/Customer/List"><i class="far fa-address-card"></i>  Clientes</a></li>'
	 +'            <li><a href="#List/Contact/List"><i class="far fa-address-card"></i>  Contacto</a></li>'
	 +'          </ul>'
	 +'        </li>'

	 +'        <li class="treeview">'
		+'          <a href="#">'
		+'            <i class="fas fa-briefcase"></i>'
		+'            <span>PROYECTOS</span>'
		+'            <span class="pull-right-container">'
		+'              <i class="fa fa-angle-left pull-right"></i>'
		+'            </span>'
		+'          </a>'
		+'          <ul class="treeview-menu">'
		+'            <li><a href="#List/Project/List"><i class="fas fa-briefcase"></i>  Proyecto</a></li>'
		+'            <li><a href="#List/Task/Gantt"><i class="fas fa-bell"></i>  Tarea</a></li>'
		+'            <li><a href="#List/Project%20Type/List"><i class="octicon octicon-plus"></i>  Tipo de Proyecto</a></li>'
		+'            <li><a href="#List/Activity%20Type/List"><i class="fa fa-cog"></i>  Tipo de Actividad</a></li>'
		+'          </ul>'
		+'        </li>'


 +'        <li class="treeview">'
 +'          <a href="#">'
 +'            <i class="fas fa-inbox"></i>'
 +'            <span>COMPRAS</span>'
 +'            <span class="pull-right-container">'
 +'              <i class="fa fa-angle-left pull-right"></i>'
 +'            </span>'
 +'          </a>'
 +'          <ul class="treeview-menu">'
 +'            <li><a href="#List/Supplier/List"><i class="octicon octicon-package"></i>  Proveedores</a></li>'
 +'            <li><a href="#List/Request%20for%20Quotation/List"><i class="fas fa-bell"></i>  RFQ</a></li>'
 +'            <li><a href="#List/Supplier%20Quotation/List"><i class="fas fa-briefcase"></i>  Cotizacion Proveedor</a></li>'
 +'            <li><a href="#List/Purchase%20Order/List"><i class="octicon octicon-package"></i>  Orden de Compra</a></li>'
 +'            <li><a href="#Form/Buying%20Settings"><i class="fa fa-cog"></i>  Config. Compras</a></li>'
 +'          </ul>'
 +'        </li>'


 +'        <li class="treeview">'
 +'          <a href="#">'
 +'            <i class="fas fa-chart-line"></i>'
 +'            <span>Reportes</span>'
 +'            <span class="pull-right-container">'
 +'              <i class="fa fa-angle-left pull-right"></i>'
 +'            </span>'
 +'          </a>'
 +'          <ul class="treeview-menu">'
 +'            <li><a href="#query-report/Ventas del Dia"> <i class="far fa-money-bill-alt"></i> Ventas x Fecha</a></li>'
 +'            <li><a href="#query-report/Gross Profit"><i class="far fa-money-bill-alt"></i> Margenes x Producto</a></li>'
 +'            <li><a href="#query-report/Sales Invoice Trends"><i class="far fa-money-bill-alt"></i> Comportamiento Ventas</a></li>'
 +'            <li><a href="#query-report/Accounts%20Payable"><i class="far fa-money-bill-alt"></i> Cuentas por Pagar</a></li>'
 +'            <li><a href="#query-report/Accounts%20Receivable"><i class="far fa-money-bill-alt"></i> Cuentas por Cobrar</a></li>'
 +'            <li><a href="#stock-balance"><i class="fa fa-table"></i>  Niveles de Inventario</a></li>'
 +'            <li><a href="#query-report/Stock Balance"><i class="fa fa-table"></i>  Balance Inventario</a></li>'
 +'          </ul>'
 +'        </li>'


 	// +'        <li class="treeview">'
 	// +'          <a href="#">'
 	// +'            <i class="fas fa-barcode"></i>'
 	// +'            <span>MANUFACTURA</span>'
 	// +'            <span class="pull-right-container">'
 	// +'              <i class="fa fa-angle-left pull-right"></i>'
 	// +'            </span>'
 	// +'          </a>'
 	// +'          <ul class="treeview-menu">'
	//
 	//  +'            <li><a href="#List/Production%20Order/List"><i class="octicon octicon-screen-full"></i> Orden Produccion</a></li>'
 	//  +'            <li><a href="#List/BOM/List"><i class="fas fa-barcode"></i> Bill de Materiales</a></li>'
 	//  +'            <li><a href="#Form/BOM%20Update%20Tool"> <i class="octicon octicon-screen-normal"></i>Actualizar BOM</a></li>'
  // +'            <li><a href="#List/Manufacturer/List"><i class="fas fa-briefcase"></i>  Manufacturadores</a></li>'
 	// +'          </ul>'
 	// +'        </li>'



 +'        <li class="treeview">'
 +'          <a href="#">'
 +'            <i class="fa fa-cog"></i>'
 +'            <span>Configuracion</span>'
 +'            <span class="pull-right-container">'
 +'              <i class="fa fa-angle-left pull-right"></i>'
 +'            </span>'
 +'          </a>'
 +'          <ul class="treeview-menu">'
 +'            <li><a href="#List/User/List"><i class="octicon octicon-person"></i>  Usuarios</a></li>'
 +'            <li><a href="#permission-manager"><i class="octicon octicon-organization"></i>  Privilegios</a></li>'
 +'            <li><a href="#Form/Dolares/Dolares"><i class="fas fa-flag"></i>  Tipo de Cambio</a></li>'
 +'            <li><a href="#List/Mode of Payment/List"><i class="far fa-money-bill"></i>  Metodo de Pago</a></li>'
 +'            <li><a href="#List/POS Profile/List"><i class="octicon octicon-person"></i>  Perfil de Venta</a></li>'
 +'            <li><a href="#Tree/Warehouse"><i class="octicon octicon-package"></i>  Almacenes</a></li>'
 // +'            <li><a href="#Form/Item Attribute/Talla"><i class="octicon octicon-tasklist"></i>  Tallas</a></li>'
 +'            <li><a href="#List/Caja/List"><i class="far fa-money-bill-alt"></i>  Caja</a></li>'
 +'            <li><a href="#List/Letter Head/List"><i class="octicon octicon-diff"></i>  Membrete</a></li>'
 +'            <li><a href="#List/Print Heading/List"><i class="octicon octicon-eye"></i>  Encabezado Ticket</a></li>'
 +'            <li><a href="#List/Terms and Conditions/List"><i class="octicon octicon-eye"></i>  Pol. Devoluciones</a></li>'
 +'          </ul>'
 +'        </li>'


 +'        <li class="treeview">'
 +'          <a href="http://Totall.mx">'
 +'            <i class="far fa-question-circle" style="color:Tomato"></i>'
 +'            <span>Ayuda</span>'
 +'            <span class="pull-right-container">'
 +'              <i class="fa fa-angle-left pull-right"></i>'
 +'            </span>'
 +'          </a>'
 +'        </li>'
 +'    </ul>'
 +'    </section>'
 +'  </aside>'
 +'<div class="overlay"><div>' ;

 // }
