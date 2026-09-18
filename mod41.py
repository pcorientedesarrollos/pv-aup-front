# -*- coding: utf-8 -*-
import re

with open('src/app/features/productos/productos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

# We want to remove the "Ganancia Proyectada" section.
# It looks like:
#       <div class="hidden sm:block w-px h-10 bg-indigo-100/50"></div>
#   
#       <div class="flex items-center gap-3">
#         <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
#           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
#         </div>
#         <div class="flex flex-col">
#           <span class="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Ganancia Proyectada</span>
#           <span class="text-xl font-black text-amber-900">{{ resumenInventario().utilidad | currency:'MXN':'symbol-narrow':'1.2-2' }}</span>
#         </div>
#       </div>

pattern = r'<div class="hidden sm:block w-px h-10 bg-indigo-100/50"></div>\s*<div class="flex items-center gap-3">\s*<div class="w-10 h-10 rounded-full bg-amber-100.*?</svg>\s*</div>\s*<div class="flex flex-col">\s*<span class="text-\[10px\] font-bold text-amber-500 uppercase tracking-wider">Ganancia Proyectada</span>\s*<span class="text-xl font-black text-amber-900">\{\{ resumenInventario\(\)\.utilidad \| currency:\'MXN\':\'symbol-narrow\':\'1\.2-2\' \}\}</span>\s*</div>\s*</div>'

new_text = re.sub(pattern, '', text, flags=re.DOTALL)

with open('src/app/features/productos/productos.component.html', 'w', encoding='utf-8') as f:
    f.write(new_text)
