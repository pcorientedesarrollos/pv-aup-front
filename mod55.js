const fs = require('fs');
let text = fs.readFileSync('src/app/features/pos/catalogo/catalogo.component.html', 'utf-8');

const regex = /(<div class="absolute inset-y-0 right-0 pr-2 flex items-center">\s*<button \(click\)="escaneandoConCamara\.set\(true\)".*?<\/button>\s*<\/div>\s*<\/div>)/s;

const replacement = `$1
          
          <a href="/productos?modal=nuevo" target="_blank"
            class="hidden sm:flex bg-amber-500 hover:bg-amber-600 text-white px-3 py-2.5 rounded-lg font-bold items-center gap-2 whitespace-nowrap shadow-sm transition-colors"
            title="Nuevo Producto">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Nuevo
          </a>
          
          <button (click)="cargarCategoriasYProductos()"
            class="hidden sm:flex bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2.5 rounded-lg font-bold items-center justify-center shadow-sm transition-colors"
            title="Recargar catálogo">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </button>`;

text = text.replace(regex, replacement);
fs.writeFileSync('src/app/features/pos/catalogo/catalogo.component.html', text, 'utf-8');
console.log('Modified pos catalogo.component.html');
