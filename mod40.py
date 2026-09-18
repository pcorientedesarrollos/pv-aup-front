# -*- coding: utf-8 -*-
with open('src/app/features/proveedores/proveedores.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Find the entire filter-row div content
pattern = r'(<div class="filters-row flex flex-col md:flex-row gap-4 items-end p-4 border-b border-gray-100">\s*)<div class="filter-control w-full md:max-w-xs relative">(.*?</select>\s*</div>)\s*<div class="filter-control w-full md:max-w-md relative">(.*?class="filter-input pl-9">\s*</div>)'

def repl(m):
    return m.group(1) + '<div class="filter-control w-full md:max-w-md relative">' + m.group(3) + '\n            <div class="filter-control w-full md:max-w-xs relative">' + m.group(2)

new_text = re.sub(pattern, repl, text, flags=re.DOTALL)

with open('src/app/features/proveedores/proveedores.component.html', 'w', encoding='utf-8') as f:
    f.write(new_text)
