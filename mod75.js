const fs = require('fs');

let html = fs.readFileSync('src/app/features/compras/nueva-compra.component.html', 'utf8');

const emptyStateOld = `              @if (productosFiltrados().length === 0) {
                <li class="p-4 flex flex-col items-center justify-center text-slate-500 gap-2">
                  <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span class="text-sm font-medium">No se encontraron productos</span>
                </li>
              }`;

const emptyStateNew = `              @if (productosFiltrados().length === 0) {
                <li class="p-4 flex flex-col items-center justify-center text-slate-500 gap-3">
                  <span class="text-sm font-medium">No se encontr\u00F3 "{{ busquedaProducto() }}"</span>
                  <button (click)="abrirProductoRapido(); busquedaProducto.set(''); $event.stopPropagation();" class="text-sm font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-lg transition-colors border border-amber-200 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    Dar de alta "{{ busquedaProducto() }}"
                  </button>
                </li>
              }`;

html = html.replace(emptyStateOld, emptyStateNew);

fs.writeFileSync('src/app/features/compras/nueva-compra.component.html', html, 'utf8');
console.log('Fixed empty state quick add.');
