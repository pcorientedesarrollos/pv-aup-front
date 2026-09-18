# -*- coding: utf-8 -*-
import re

with open('src/app/features/gastos/gastos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'idCategoria\.set\([^)]*\)', 'idCategoria.set($event)', text)

with open('src/app/features/gastos/gastos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
