const fs = require('fs');
let text = fs.readFileSync('src/app/features/cotizaciones/nueva-cotizacion/nueva-cotizacion.html', 'utf-8');

const regex = /<input type="text" \[ngModel\]="busquedaProducto\(\)" \(ngModelChange\)="buscarProducto\(\$event\)" placeholder="Buscar por c.digo de barras, clave o nombre del producto" class="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out">/m;

const replacement = `<div class="flex gap-2 w-full">
        <div class="relative flex-1">
          <input type="text" [ngModel]="busquedaProducto()" (ngModelChange)="buscarProducto($event)" placeholder="Buscar por código de barras, clave o nombre del producto" class="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out">
        </div>
        <a href="/productos?modal=nuevo" target="_blank"
          class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg font-bold flex items-center gap-2 whitespace-nowrap shadow-sm transition-colors"
          title="Abre en una nueva pestaña para crear un producto sin perder tu progreso aquí">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Nuevo
        </a>
      </div>`;

text = text.replace(regex, replacement);
fs.writeFileSync('src/app/features/cotizaciones/nueva-cotizacion/nueva-cotizacion.html', text, 'utf-8');
console.log('Modified nueva-cotizacion.html');
