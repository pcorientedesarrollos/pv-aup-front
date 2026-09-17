# -*- coding: utf-8 -*-
import re

# 1. Fix gastos.component.html
with open('src/app/features/gastos/gastos.component.html', 'r', encoding='utf-8') as f:
    gastos = f.read()

gastos = gastos.replace('idCategoria.set(\)', 'idCategoria.set()')
gastos = gastos.replace('idCategoria.set(\\)', 'idCategoria.set()')

with open('src/app/features/gastos/gastos.component.html', 'w', encoding='utf-8') as f:
    f.write(gastos)

# 2. Fix dashboard.ts
with open('src/app/features/dashboard/dashboard.ts', 'r', encoding='utf-8') as f:
    dash = f.read()

dash = dash.replace('BaseChartDirective', '')
dash = dash.replace(', ,', ',')
dash = dash.replace(', ]', ']')
dash = dash.replace(',]', ']')

with open('src/app/features/dashboard/dashboard.ts', 'w', encoding='utf-8') as f:
    f.write(dash)
