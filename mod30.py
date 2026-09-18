# -*- coding: utf-8 -*-
with open('src/app/features/gastos/gastos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
text = re.sub(r'<th class="p-4 font-semibold">Categoria</th>', '', text)
text = re.sub(r'<td class="p-4 text-slate-700 dark:text-slate-300">\s*<span class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">\{\{ g\.categoria\?\.nombre \|\| \'Sin Categoria\' \}\}</span>\s*</td>', '', text)

text = re.sub(r'<div class="space-y-1\.5">\s*<label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Categoria</label>\s*<select \[ngModel\]="idCategoria\(\)".*?</select>\s*</div>', '', text, flags=re.DOTALL)

with open('src/app/features/gastos/gastos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
