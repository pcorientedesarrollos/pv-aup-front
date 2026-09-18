# -*- coding: utf-8 -*-
with open('src/app/features/gastos/gastos.component.html', 'r', encoding='utf-8') as f:
    gastos = f.read()

gastos = gastos.replace('idCategoria.set()', 'idCategoria.set()')
gastos = gastos.replace('idCategoria.set(\\\\)', 'idCategoria.set()')

with open('src/app/features/gastos/gastos.component.html', 'w', encoding='utf-8') as f:
    f.write(gastos)
