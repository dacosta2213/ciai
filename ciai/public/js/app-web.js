frappe.ready(function() {
	$("[href='https://erpnext.com?source=website_footer']").hide();

	// Para redireccionar automaticamente post-login
	localStorage.last_visited = "/desk#dashboard-retail";
	console.log("ruta post-login: ",localStorage.last_visited);

//	window.$crisp=[];window.CRISP_WEBSITE_ID="20268af8-fa31-405d-9563-70e22826a2e6";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
});
