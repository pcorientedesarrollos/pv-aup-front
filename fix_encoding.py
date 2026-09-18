# -*- coding: utf-8 -*-
with open('src/app/features/gastos/gastos.component.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# I will replace 'Garraf' anything 'n' with 'Garrafón'
import re
text = re.sub(r'Ej\. Garraf[^n]+n de agua', 'Ej. Insumos', text)

with open('src/app/features/gastos/gastos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
