const fs = require('fs');

// 1. Fix Gastos Filters
let gastosHtml = fs.readFileSync('src/app/features/gastos/gastos.component.html', 'utf8');
const searchBlockRegex = /<div class="relative flex-1 sm:flex-none">[\s\S]*?<\/div>/;
const filtersHtml = `
      <div class="flex flex-wrap gap-3">
        <div class="flex flex-col">
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
        <div class="flex flex-col">
          <label class="text-xs font-bold text-slate-500 mb-1">Desde</label>
          <input type="date" [ngModel]="desde()" (ngModelChange)="desde.set($event); paginaActual.set(1); cargarGastos()"
                 class="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white">
        </div>
        <div class="flex flex-col">
          <label class="text-xs font-bold text-slate-500 mb-1">Hasta</label>
          <input type="date" [ngModel]="hasta()" (ngModelChange)="hasta.set($event); paginaActual.set(1); cargarGastos()"
                 class="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all dark:text-white">
        </div>
      </div>
`;
gastosHtml = gastosHtml.replace(searchBlockRegex, filtersHtml);
fs.writeFileSync('src/app/features/gastos/gastos.component.html', gastosHtml, 'utf8');

// 2. Add Nuevo in Nueva Compra HTML
let compraHtml = fs.readFileSync('src/app/features/compras/nueva-compra.component.html', 'utf8');

const proveedorRegex = /<label class="block text-xs font-bold text-slate-500 uppercase mb-1">Proveedor <span class="text-red-500">\*<\/span><\/label>/m;
const proveedorRep = `<div class="flex justify-between items-center mb-1">
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
compraHtml = compraHtml.replace(proveedorRegex, proveedorRep);

const prodRegex = /<div class="relative">\s*<span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">[\s\S]*?placeholder="Escribe el nombre, clave o escanea el código de barras...">\s*<\/div>/m;
const prodRep = `<div class="flex gap-2 relative">
            <div class="relative flex-1">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input type="text" [ngModel]="busquedaProducto()" (ngModelChange)="busquedaProducto.set($event)" 
                class="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50" 
                placeholder="Escribe el nombre, clave o escanea el código de barras...">
            </div>
            
            <a href="/productos?modal=nuevo" target="_blank"
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
compraHtml = compraHtml.replace(prodRegex, prodRep);

fs.writeFileSync('src/app/features/compras/nueva-compra.component.html', compraHtml, 'utf8');

// 3. Add ActivatedRoute support to Proveedores component
let provTs = fs.readFileSync('src/app/features/proveedores/proveedores.component.ts', 'utf8');
if (!provTs.includes('ActivatedRoute')) {
  provTs = provTs.replace(/import { Router } from '@angular\/router';/, "import { Router, ActivatedRoute } from '@angular/router';");
  provTs = provTs.replace(/constructor\(private http: HttpClient, private auth: AuthService, private router: Router\) \{/, "constructor(private http: HttpClient, private auth: AuthService, private router: Router, private route: ActivatedRoute) {");
  provTs = provTs.replace(/ngOnInit\(\) {\s*this\.cargarProveedores\(\);\s*this\.cargarProductos\(\);\s*}/, `ngOnInit() {\n    this.cargarProveedores();\n    this.cargarProductos();\n    this.route.queryParams.subscribe(params => {\n      if (params['modal'] === 'nuevo') {\n        this.abrirModalCrear();\n      }\n    });\n  }`);
  fs.writeFileSync('src/app/features/proveedores/proveedores.component.ts', provTs, 'utf8');
}

console.log("Changes applied locally with UTF-8.");
