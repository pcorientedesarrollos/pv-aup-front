# -*- coding: utf-8 -*-
with open('src/app/features/gastos/gastos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix the broken set(\)
text = text.replace('busqueda.set(\);', 'busqueda.set($event);')
text = text.replace('desde.set(\);', 'desde.set($event);')
text = text.replace('hasta.set(\);', 'hasta.set($event);')

with open('src/app/features/gastos/gastos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
