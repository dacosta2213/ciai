# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
import json
from frappe import _
import frappe.utils
import frappe.async
import frappe.sessions
import frappe.utils.file_manager
import frappe.desk.form.run_method
from frappe.utils.response import build_response
import datetime
from datetime import date,datetime,timedelta
import requests
import pytz


@frappe.whitelist()
def ruta(login_manager):
    ruta = frappe.db.get_value("User", login_manager.user,"ruta_login")
    frappe.errprint(ruta)
    frappe.local.response["home_page"] = ruta


@frappe.whitelist(allow_guest=True)
# Para GoogleMaps (lo mando llamar desde doctype MONITOREO). Carga las estaciones registradas y genera el archivo para el mapa
def get_estaciones_estatus():
    estaciones = frappe.get_all('Estacion', fields=['nombre','estatus','ciclo','lat','lng','color'])
    return estaciones

@frappe.whitelist(allow_guest=True)
def acuerdo(ciclo):
    frappe.db.sql("""UPDATE `tabCiclo` SET acuerdo=1 WHERE name=%s AND estatus= 'Finalizado' """, (ciclo) )
    frappe.db.commit()
    return "Ciclo Validado Exitosamente"

@frappe.whitelist(allow_guest=True)
def get_lect_todas(ciclo):
    lecturas = frappe.db.sql("select estatus,estacion,creation,field1 from `tabLectura` where ciclo=%s", (ciclo), as_dict=1)
    return lecturas

@frappe.whitelist()
def get_lect(estacion):
    lecturas = frappe.get_list('Lectura', filters={'estacion': estacion}, fields=['estatus','name','estacion','creation','field1','bat'],limit_page_length=10)
    return lecturas

@frappe.whitelist()
def fuera_rango(estacion):
    lecturas = frappe.get_list('Lectura', filters={'estacion': estacion, 'estatus': "Fuera de Rango"}, fields=['estatus','name','estacion','creation','field1','bat'],limit_page_length=10)
    return lecturas

@frappe.whitelist(allow_guest=True)
# carga las estaciones registradas y genera el archivo para el mapa
def get_estaciones():
    estaciones = frappe.get_all('Estacion', fields=['nombre','lat','lng'])
    feature = """ { "type": "FeatureCollection" , "features":[ """
    for i in estaciones:
        feature += """ { "type" : "Feature","properties":{"name": " """ + i.nombre + """ "},"geometry":{"type":"Point","coordinates":[""" + str(i.lat) + """,""" + str(i.lng) + """]}}"""
        if i == estaciones[-1]:
            feature += """ ]} """
        else:
            feature += """ , """
    return feature

@frappe.whitelist(allow_guest=True)
# validar certificados
def validar_cert(id,secret,ciclo):
    valido = frappe.db.sql("select skip_authorization from `tabOAuth Client` where client_id=%s AND client_secret=%s AND skip_authorization=0", (id,secret))
    cadena = frappe.db.get_value("Ciclo", ciclo ,"cadena")
    if valido:
        return(cadena)
    else:
        return('Certificado Invalido')


@frappe.whitelist(allow_guest=True)
def addlectura(apikey=None,estacion=None,field1=0,field2=0,field3=0,field4=0,lat=0,lng=0,bat=0):
    """Agregar Lectura"""

    ciclo = frappe.db.get_value("Estacion", estacion ,"ciclo")
    ciclo_estatus = frappe.db.get_value("Ciclo", ciclo ,"estatus")
    latitud = frappe.db.get_value("Estacion", estacion ,"lat")
    longitud = frappe.db.get_value("Estacion", estacion ,"lng")
    temp_inicio  = frappe.db.get_value("Ciclo", ciclo ,"temperatura")
    max  = frappe.db.get_value("Ciclo", ciclo ,"max")
    min  = frappe.db.get_value("Ciclo", ciclo ,"min")
    horas  = frappe.db.get_value("Ciclo", ciclo ,"horas")
    # horas  = 10
    hora_inicio  = frappe.db.get_value("Ciclo", ciclo ,"inicio")
    hora_final = hora_inicio  + timedelta(hours=horas) if hora_inicio else "na"
    hora_inicio_str = str(hora_inicio) if hora_inicio else "na"
    hora_final_str = str(hora_final) if hora_final else "na"

    tz = pytz.timezone('US/Central')
    now = datetime.now(tz)
    estatus_lectura = "En Rango"

    cadena_ciclo = " STATUS: " + ciclo_estatus + " LAT: " + str(latitud) + " LNG: " + str(longitud) + " TEMPERATURA INICIO: " + str(temp_inicio) + "MAX: " + str(max) + "MIN: " + str(min) + " HORASMONITOREO: " + str(horas) + " HORA INICIO: " + hora_inicio_str  + " HORA FIN: " + hora_final_str


    if int(field1) < min or int(field1) > max:
        estatus_lectura="Fuera de Rango"

    # RG-Tomar lectura y generar registro en tabLectura
    doc = frappe.get_doc({
    "doctype": "Lectura",
    "estacion": estacion,
    "lat": lat,
    "estatus": estatus_lectura,
    "lng": lng,
    "bat": bat,
    "ciclo": ciclo ,
    "field1": field1 ,
    "field2": field2,
    "field3": field3,
    "field4": field4 })
    doc.insert(ignore_permissions=True)
    frappe.db.commit()

    # Para registrar 1RA LECTURA (cuando encienden la maquina) pasar de Inactivo a Preactivado
    if ciclo_estatus == "Inactivo":
        frappe.db.sql("UPDATE tabCiclo  SET estatus = 'Preactivado' WHERE name = %s", (ciclo) )
        frappe.db.sql("UPDATE tabCiclo  SET primera_lectura = %s WHERE name = %s", (now, ciclo) )
        frappe.db.sql("UPDATE tabEstacion  SET estatus = 'Prendida' , color = 'green' WHERE name = %s", (estacion) )
        frappe.db.commit()
        enviar_alerta(ciclo,estacion,msg="Se registra 1ra Lectura.")

    # Temperatura alcanzada.Para Iniciar la medicion de las 72 horas y pasar de  Preactivado a Activo
    if field1 == temp_inicio and ciclo_estatus == "Preactivado":
        frappe.db.sql("UPDATE tabCiclo  SET estatus='Activo' WHERE name = %s", (ciclo) )
        frappe.db.sql("UPDATE tabCiclo  SET inicio = %s WHERE name = %s", (now, ciclo) )
        frappe.db.sql("UPDATE tabEstacion  SET estatus = 'En Rango' , color = 'blue' WHERE name = %s", (estacion) )
        frappe.db.commit()
        enviar_alerta(ciclo,estacion,msg="Temperatura de inicio alcanzada. Comienza monitoreo de 72 horas.")

    # Para alertar si la temperatura rebasa lo definido en el perfil de la especie
    if (int(field1) < min or int(field1) > max) and ciclo_estatus == "Activo":
        frappe.db.sql("UPDATE tabCiclo  SET estatus='Truncado' WHERE name = %s", (ciclo))
        frappe.db.sql("UPDATE tabCiclo  SET final = %s WHERE name = %s", (now, ciclo) )
        frappe.db.sql("UPDATE tabEstacion  SET estatus = 'Fuera de Rango', color = 'yellow' WHERE name = %s", (estacion) )
        frappe.db.commit()
        enviar_alerta(ciclo,estacion,msg="Lectura Fuera de rango. La lectura en temperatura es mayor o menor que la ideal.")

    if isinstance(hora_final, basestring):
        print('es string')
    else:
        if datetime.now() > hora_final:
            mensaje = "Es tiempo de terminar el ciclo. Hora Final Esperada: " + str(hora_final)
            frappe.db.sql("UPDATE tabCiclo  SET estatus='Finalizado' WHERE name = %s", (ciclo))
            frappe.db.sql("UPDATE tabCiclo  SET cadena = %s, final = %s WHERE name = %s", (cadena_ciclo, now, ciclo) )
            frappe.db.commit()
            enviar_alerta(ciclo,estacion,msg=mensaje)

    # Para alertar si se movio la estacion
    if float(lat) != float(latitud) or float(lng) != float(longitud) :
        enviar_alerta(ciclo,estacion,msg="La estacion se movio de Lugar")

    # frappe.errprint("Hora Actual: " + str(datetime.now()) + ' Hora Final: '+ str(hora_final))
    return('Lectura Registrada. Max:' + str(max) + ' Min: ' + str(min) + ' Status: ' + estatus_lectura)


def enviar_alerta(ciclo,estacion,msg):
    c = frappe.get_doc("Ciclo", ciclo)
    frappe.sendmail(['admin@codigo-binario.com',"{0}".format(c.notificar)], \
    subject=ciclo + " de Estacion: " + estacion , \
    content=msg,delayed=False)

@frappe.whitelist(allow_guest=True)
def editEstacion(name,lng,lat):
    """Agregar cambio de referencia greografica de las estaciones"""
    frappe.db.sql("UPDATE tabEstacion SET lng=%s , lat=%s WHERE name=%s", (lng,lat,name))
    frappe.db.commit()

    return('Estacion Actualizada: ' + name )

@frappe.whitelist(allow_guest=True)
def addEstacion(name,lng,lat):
    """Agregar estacion"""
    doc = frappe.get_doc({ "doctype": "Estacion", "nombre": name ,"lng": lng,"lat": lat })
    doc.insert(ignore_permissions=True)
    frappe.db.commit()
    return('Estacion Agregada: ' + name )




# RG- Metodo viejo (cuando no usabamos get_doc)
# @frappe.whitelist(allow_guest=True)
# def addlectura(apikey=None,field1=0,field2=0,field3=0,field4=0):
#     """Agregar Lectura"""
#     tz = pytz.timezone('US/Central')
#     # frappe.errprint(datetime.now)
#     now = datetime.now(tz)
#     frappe.db.sql("insert into tabLectura (name,creation,field1,field2,field3,field4,estacion) values (%s,%s,%s,%s,%s,%s,%s)", (now,now,field1,field2,field3,field4,apikey))
#     frappe.db.commit()
#
#     f1 = float(field1)
#     return('Lectura Correcta. Valor obtenido: ' + str(f1))
