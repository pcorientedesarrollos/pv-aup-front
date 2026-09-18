const fs = require('fs');

let gastosHtml = fs.readFileSync('src/app/features/gastos/gastos.component.html', 'utf8');

// Replace the WHOLE header flex row instead of guessing inner divs
const headerRegex = /<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/;

const newHeader = `<div class="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
    <div>
      <h1 class="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        Registro de Gastos
      </h1>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-3 w-full xl:w-auto items-end sm:items-center">
      <div class="flex flex-col w-full sm:w-auto">
        <label class="text-xs font-bold text-slate-500 mb-1">Buscar</label>
        <div class="relative w-full sm:w-64">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <input type="text" [ngModel]="busqueda()" (ngModelChange)="busqueda.set($event); paginaActual.set(1)"
                 class="pl-10 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white"
                 placeholder="Buscar gasto...">
        </div>
      </div>
      
      <div class="flex flex-col w-full sm:w-auto">
        <label class="text-xs font-bold text-slate-500 mb-1">Desde</label>
        <input type="date" [ngModel]="desde()" (ngModelChange)="desde.set($event); paginaActual.set(1); cargarGastos()"
               class="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white">
      </div>
      
      <div class="flex flex-col w-full sm:w-auto">
        <label class="text-xs font-bold text-slate-500 mb-1">Hasta</label>
        <input type="date" [ngModel]="hasta()" (ngModelChange)="hasta.set($event); paginaActual.set(1); cargarGastos()"
               class="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white">
      </div>

      <div class="flex flex-col w-full sm:w-auto mt-4 sm:mt-0">
        <label class="text-xs font-bold text-transparent mb-1 hidden sm:block">.</label>
        <button (click)="abrirModal()" class="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Nuevo Gasto</span>
        </button>
      </div>
    </div>
  </div>`;

gastosHtml = gastosHtml.replace(headerRegex, newHeader);
fs.writeFileSync('src/app/features/gastos/gastos.component.html', gastosHtml, 'utf8');
console.log("Fixed gastos header!");
