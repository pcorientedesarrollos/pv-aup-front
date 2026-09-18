# -*- coding: utf-8 -*-
import re

with open('src/app/features/productos/productos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Extract the Resumen block
resumen_match = re.search(r'(\s*<!-- Resumen de Inventario -->\s*<div class="w-fit ml-auto bg-gradient-to-r from-indigo-50.*?(?=@if \(isSoporte\(\)))', text, re.DOTALL)
if resumen_match:
    resumen_block = resumen_match.group(1)
    text = text.replace(resumen_block, '')
    
    resumen_block = resumen_block.replace('ml-auto', '')
    
    # 2. Insert it before the filter buttons
    target = '<div class="flex gap-3 flex-wrap">'
    
    # Wrap it so they are stacked
    replacement = f'''<div class="flex flex-col gap-3 items-end">\n{resumen_block}\n<div class="flex gap-3 flex-wrap">'''
    
    text = text.replace(target, replacement)
    
    # We opened a flex-col div, we need to close it where the flex-wrap div closes
    # The flex wrap div closes at `</div>\n  </div>\n\n  @if` (since we removed Resumen)
    # Let's just find the closing of the main header row and add an extra </div>
    # But wait, it's safer to just do a smart regex or just insert the `</div>` before the `<!-- Resumen` used to be.
    # Actually, we can just replace the closing tag of the `flex-wrap` div.
    # It looks like:
    #       <span class="text-2xl font-black text-slate-800">{{ productosFiltrados().length }}</span>
    #     </div>
    #   </div>
    # </div>
    text = re.sub(r'(<span class="text-2xl font-black text-slate-800">\{\{ productosFiltrados\(\)\.length \}\}</span>\s*</div>\s*</div>)', r'\1\n</div>', text)
    
with open('src/app/features/productos/productos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
