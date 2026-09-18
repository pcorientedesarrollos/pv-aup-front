const fs = require('fs');
let text = fs.readFileSync('src/app/features/compras/nueva-compra.component.html', 'utf-8');

const regex = /<div class="relative">\s*<span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">[\s\S]*?placeholder="Escribe el nombre, clave o escanea el c.digo de barras...">\s*<\/div>/m;

const replacement = `<div class="flex gap-2 relative">
            <div class="relative flex-1">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input type="text" [ngModel]="busquedaProducto()" (ngModelChange)="busquedaProducto.set($event)" 
                class="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50" 
                placeholder="Escribe el nombre, clave o escanea el código de barras...">
            </div>
            
            <a routerLink="/productos" [queryParams]="{ modal: 'nuevo' }" target="_blank"
              class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg font-bold flex items-center gap-2 whitespace-nowrap shadow-sm transition-colors"
              title="Abre en una nueva pestaña para crear un producto sin perder tu progreso aquí">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Nuevo
            </a>
            
            <button (click)="cargarCatalogo()"
              class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-3 rounded-lg font-bold flex items-center justify-center shadow-sm transition-colors"
              title="Recargar catálogo de productos">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
          </div>`;

text = text.replace(regex, replacement);
fs.writeFileSync('src/app/features/compras/nueva-compra.component.html', text, 'utf-8');
console.log('Modified nueva-compra.component.html');
