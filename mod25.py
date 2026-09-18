# -*- coding: utf-8 -*-
import re

with open('src/app/features/gastos/gastos.component.ts', 'r', encoding='utf-8') as f:
    text = f.read()

target_props = '''  busqueda = signal('');
  paginaActual = signal(1);
  tamanoPagina = signal(15);'''

new_props = '''  busqueda = signal('');
  desde = signal<string>('');
  hasta = signal<string>('');
  paginaActual = signal(1);
  tamanoPagina = signal(15);'''
text = text.replace(target_props, new_props)

target_cargar = '''  cargarGastos() {
    this.cargando.set(true);
    this.http.get<any[]>(environment.apiUrl + '/pos/gastos').subscribe({'''

new_cargar = '''  cargarGastos() {
    this.cargando.set(true);
    let url = environment.apiUrl + '/pos/gastos?';
    if (this.desde()) url += desde=&;
    if (this.hasta()) url += hasta=&;
    
    this.http.get<any[]>(url).subscribe({'''
text = text.replace(target_cargar, new_cargar)

with open('src/app/features/gastos/gastos.component.ts', 'w', encoding='utf-8') as f:
    f.write(text)
