# -*- coding: utf-8 -*-
# Copyright (c) 2019, XERP and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Ciclo(Document):
	def after_insert(self):
		frappe.db.sql("UPDATE tabEstacion  SET ciclo = %s WHERE name = %s", (self.name,self.estacion) )
		frappe.db.commit()

	def validate(self):
		frappe.db.sql("UPDATE tabEstacion  SET ciclo = %s WHERE name = %s", (self.name,self.estacion) )
		frappe.db.commit()
