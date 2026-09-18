# -*- coding: utf-8 -*-
with open('src/app/features/proveedores/proveedores.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
text = re.sub(r'<div class="filters-row">', '<div class="filters-row flex flex-col md:flex-row gap-4 items-end p-4 border-b border-gray-100">', text)

with open('src/app/features/proveedores/proveedores.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
