const fs = require('fs');
let text = fs.readFileSync('src/app/features/compras/nueva-compra.component.html', 'utf-8');

const regex = /<label class="block text-xs font-bold text-slate-500 uppercase mb-1">Proveedor <span class="text-red-500">\*<\/span><\/label>/m;
const replacement = `<div class="flex justify-between items-center mb-1">
                <label class="block text-xs font-bold text-slate-500 uppercase">Proveedor <span class="text-red-500">*</span></label>
                <div class="flex gap-2">
                  <button (click)="cargarProveedores()" class="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1" title="Recargar lista de proveedores">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  </button>
                  <a href="/proveedores?modal=nuevo" target="_blank" class="text-xs text-amber-600 hover:text-amber-800 font-bold flex items-center gap-1" title="Abre en una nueva pestaña para dar de alta un proveedor sin perder tu progreso aquí">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    Nuevo
                  </a>
                </div>
              </div>`;

text = text.replace(regex, replacement);
fs.writeFileSync('src/app/features/compras/nueva-compra.component.html', text, 'utf-8');
console.log('Modified nueva-compra.component.html for Proveedores');
