# -*- coding: utf-8 -*-
import re

with open('src/app/features/home/home.component.ts', 'r', encoding='utf-8') as f:
    text = f.read()

target = '''  resumen = signal<{
    ventasHoy: number;
    totalClientes: number;
    movimientosHoy: number;
    ultimosMovimientos: any[];
    ventasSemana: number[];
    topProductos: any[];
  } | null>(null);'''

text = text.replace(target, '''  resumen = signal<any>(null);''')

with open('src/app/features/home/home.component.ts', 'w', encoding='utf-8') as f:
    f.write(text)
