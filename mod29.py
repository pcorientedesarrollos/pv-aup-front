# -*- coding: utf-8 -*-
with open('src/app/features/gastos/gastos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Remove TH
text = text.replace('<th class="p-4 font-semibold">Categoria</th>\n', '')

# Remove TD
target_td = '''                <td class="p-4 text-slate-700 dark:text-slate-300">
                  <span class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">{{ g.categoria?.nombre || 'Sin Categoria' }}</span>
                </td>\n'''
text = text.replace(target_td, '')

# Remove modal input
target_modal = '''        <div class="p-6 space-y-4">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Categoria</label>
            <select [ngModel]="idCategoria()" (ngModelChange)="idCategoria.set(\)"
                   class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white">
              <option [ngValue]="null">Sin Categoria</option>
              @for (cat of categorias(); track cat.idCategoria) {
                <option [ngValue]="cat.idCategoria">{{ cat.nombre }}</option>
              }
            </select>
          </div>'''

new_modal = '''        <div class="p-6 space-y-4">'''
text = text.replace(target_modal, new_modal)

with open('src/app/features/gastos/gastos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
