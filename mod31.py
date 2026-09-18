# -*- coding: utf-8 -*-
with open('src/app/features/productos/productos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

resumen_match = re.search(r'(\s*<!-- Resumen de Inventario -->\s*<div class="w-fit ml-auto bg-gradient-to-r from-indigo-50.*?</div>\s*</div>)', text, re.DOTALL)
if resumen_match:
    resumen_block = resumen_match.group(1)
    # 1. Remove it from current position
    text = text.replace(resumen_block, '')
    
    # 2. Find the wrapper of the filters: `<div class="flex gap-3 flex-wrap">`
    target = '<div class="flex gap-3 flex-wrap">'
    replacement = f'''<div class="flex flex-col gap-3 items-end">
      {resumen_block.replace("ml-auto", "").strip()}
      <div class="flex gap-3 flex-wrap justify-end">'''
    
    text = text.replace(target, replacement, 1)
    
    # 3. Add closing div for the flex-col wrapper. We find where the `gap-3 flex-wrap` div closes.
    # It closes right before the `</div>` that closes the header.
    # In the original file:
    #       </div>
    #     </div>
    #   </div>
    #   <!-- Resumen de Inventario -->
    # We can just replace `</div>\n  </div>\n\n  <!-- Resumen de Inventario -->` wait, we already removed Resumen!
    
with open('src/app/features/productos/productos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
