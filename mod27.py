# -*- coding: utf-8 -*-
with open('src/app/features/gastos/gastos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

target = '''<div class="flex flex-col sm:flex-row gap-4 items-center justify-between mt-4">
      <div class="relative w-full sm:w-auto flex-1 max-w-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <input type="text" [ngModel]="busqueda()" (ngModelChange)="busqueda.set(\); paginaActual.set(1)"
               class="pl-10 w-full sm:w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white"
               placeholder="Buscar gasto...">
      </div>
      <button (click)="abrirModal()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl text-sm transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        <span class="hidden sm:inline">Nuevo Gasto</span>
      </button>
    </div>'''

new_controls = '''<div class="flex flex-col sm:flex-row gap-4 items-end mt-4">
      <!-- Filtros -->
      <div class="flex flex-col sm:flex-row gap-4 flex-1">
        <div class="flex flex-col gap-1 w-full sm:w-64">
          <label class="text-xs font-semibold text-slate-500">Buscar</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <input type="text" [ngModel]="busqueda()" (ngModelChange)="busqueda.set(\); paginaActual.set(1)"
                   class="pl-10 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white"
                   placeholder="Buscar folio, concepto, cajero...">
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-slate-500">Desde</label>
          <input type="date" [ngModel]="desde()" (ngModelChange)="desde.set(\); cargarGastos()"
                 class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white">
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-slate-500">Hasta</label>
          <input type="date" [ngModel]="hasta()" (ngModelChange)="hasta.set(\); cargarGastos()"
                 class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white">
        </div>
      </div>

      <button (click)="abrirModal()" class="px-4 py-2 h-[38px] bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl text-sm transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        <span class="hidden sm:inline">Nuevo Gasto</span>
      </button>
    </div>'''

import re
# Make regex to handle minor formatting differences
start_idx = text.find('<div class="flex flex-col sm:flex-row gap-4 items-center justify-between mt-4">')
end_idx = text.find('<button (click)="abrirModal()"')
if start_idx != -1 and end_idx != -1:
    end_div_idx = text.find('</div>', text.find('</button>', end_idx))
    if end_div_idx != -1:
        text = text[:start_idx] + new_controls + text[end_div_idx + 6:]

with open('src/app/features/gastos/gastos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
