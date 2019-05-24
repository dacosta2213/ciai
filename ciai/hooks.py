# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "ciai"
app_title = "Ciai"
app_publisher = "XERP"
app_description = "CIAI for Frappe"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "admin@posix.mx"
app_license = "MIT"


# include js, css files in header of desk.html
# RG- Aqui listar cualquier asset adicional y ponerlo en el folder de assets
app_include_css = ["/assets/ciai/css/posix.css","/assets/css/sweetalert2.css","/assets/css/modal-video.min.css","/assets/ciai/css/app.css",]
app_include_js = ["/assets/js/gmap.js","/assets/js/posix.min.js","/assets/js/sweetalert2.min.js","/assets/ciai/js/app.js","/assets/js/modal-video.min.js","/assets/js/fontawesome-all.min.js","/assets/js/charts.min.js",]

# app_include_css = "/assets/ciai/css/ciai.css"
# app_include_js = "/assets/ciai/js/ciai.js"
on_session_creation = [
	"ciai.api.ruta"
]
website_context = {
	"favicon": 	"/assets/ciai/images/favicon.png",
	"splash_image": "/assets/ciai/images/posix.svg"
}

# include js, css files in header of web template
web_include_css = "/assets/ciai/css/app-web.css"
web_include_js = "/assets/ciai/js/app-web.js"

fixtures = [
    "Role",
    "Print Format",
    "UOM",
    "Mode of Payment",
    "Property Setter",
    "Translation",
    "Custom Script",
    "Website Settings",
    "SMS Settings",
    "System Settings",
    "Website Script",
    "Custom Field"
]
# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/ciai/css/ciai.css"
# app_include_js = "/assets/ciai/js/ciai.js"

# include js, css files in header of web template
# web_include_css = "/assets/ciai/css/ciai.css"
# web_include_js = "/assets/ciai/js/ciai.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "ciai.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "ciai.install.before_install"
# after_install = "ciai.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "ciai.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"ciai.tasks.all"
# 	],
# 	"daily": [
# 		"ciai.tasks.daily"
# 	],
# 	"hourly": [
# 		"ciai.tasks.hourly"
# 	],
# 	"weekly": [
# 		"ciai.tasks.weekly"
# 	]
# 	"monthly": [
# 		"ciai.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "ciai.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "ciai.event.get_events"
# }
