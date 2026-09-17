# -*- coding: utf-8 -*-
import re

with open('src/app/features/gastos/gastos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

target_inputs = '''        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Concepto</label>'''

new_inputs = '''        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Categoria</label>
          <select [ngModel]="idCategoria()" (ngModelChange)="idCategoria.set()"
                 class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white">
            <option [ngValue]="null">Sin Categoria</option>
            @for (cat of categorias(); track cat.idCategoria) {
              <option [ngValue]="cat.idCategoria">{{ cat.nombre }}</option>
            }
          </select>
        </div>
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Concepto</label>'''

text = text.replace(target_inputs, new_inputs)

target_monto = '''        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Monto ($)</label>
          <input type="number" min="1" [ngModel]="monto()" (ngModelChange)="monto.set()"
                 class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white"
                 placeholder="0.00">
        </div>'''

new_observaciones = '''        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Observaciones (Opcional)</label>
          <textarea [ngModel]="observaciones()" (ngModelChange)="observaciones.set()" rows="2"
                 class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white resize-none"
                 placeholder="Detalles adicionales del gasto..."></textarea>
        </div>'''

text = text.replace(target_monto, target_monto + '\n' + new_observaciones)

with open('src/app/features/gastos/gastos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
