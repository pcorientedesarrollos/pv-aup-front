# -*- coding: utf-8 -*-
import re

with open('src/app/features/gastos/gastos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

target_headers = '''            <th class="p-4 font-semibold">Concepto</th>
            <th class="p-4 font-semibold">Cajero</th>'''
new_headers = '''            <th class="p-4 font-semibold">Categoria</th>
            <th class="p-4 font-semibold">Concepto</th>
            <th class="p-4 font-semibold">Cajero</th>'''

target_row = '''                <td class="p-4 text-slate-700 dark:text-slate-300 font-medium">{{ g.concepto }}</td>
                <td class="p-4 text-slate-600 dark:text-slate-400">'''
new_row = '''                <td class="p-4 text-slate-700 dark:text-slate-300">
                  <span class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">{{ g.categoria?.nombre || 'Sin Categoria' }}</span>
                </td>
                <td class="p-4 text-slate-700 dark:text-slate-300 font-medium">
                  {{ g.concepto }}
                  @if (g.observaciones) {
                    <div class="text-xs text-slate-500 font-normal mt-1">{{ g.observaciones }}</div>
                  }
                </td>
                <td class="p-4 text-slate-600 dark:text-slate-400">'''

text = text.replace(target_headers, new_headers)
text = text.replace(target_row, new_row)
text = text.replace('colspan="5"', 'colspan="6"')

with open('src/app/features/gastos/gastos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
