# -*- coding: utf-8 -*-
# Copyright (c) 2019, XERP and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class RutaCIAI(Document):
	pass
	# @frappe.whitelist(allow_guest=True)
	# def get_estaciones():
	# 	estaciones = frappe.get_all('Estacion', fields=['nombre','lat','lng'])
	# 	return estaciones

@frappe.whitelist(allow_guest=True)
def datos(contenedor):
	items = []
	filters = {"estacion": contenedor }
	x = frappe.get_list("Lectura", fields=["creation","field1","field2","field3","field4"], order_by="creation desc",filters=filters)
	# frappe.errprint(x)
	for val in x:
		# frappe.errprint(val)
		item_obj = {"creation": val.creation,
		"field1": val.field1,
		"field2": val.field2,
		"field3": val.field3,
		"field4": val.field4 }
		items.append(item_obj)

	return items
