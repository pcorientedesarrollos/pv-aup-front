const fs = require('fs');

let ts = fs.readFileSync('src/app/features/compras/nueva-compra.component.ts', 'utf8');

// Fix XML creation crashing due to hardcoded idCategoria: 1 and idCategoria: 1 for supplier
ts = ts.replace(/idCategoria: 1, \/\/ Categoría por defecto "General" si existe/g, 'idCategoria: null, // Evitar FK error');
ts = ts.replace(/idCategoria: 1, \/\/ Categora por defecto/g, 'idCategoria: null, // Evitar FK error');
ts = ts.replace(/idCategoria: 1, \/\/ Categor.a por defecto/g, 'idCategoria: null, // Evitar FK error');

// Add Quick Add Modal state
if (!ts.includes('mostrarModalProductoRapido')) {
  const replacement = `importando = computed(() => this.importandoXml() || this.importandoPdf());

  // Quick Add Modals
  mostrarModalProductoRapido = signal(false);
  nuevoProductoRapido = signal({ nombre: '', codigoBarras: '', precioCompra: 0 });
  guardandoProductoRapido = signal(false);

  mostrarModalProveedorRapido = signal(false);
  nuevoProveedorRapido = signal({ nombre: '', rfc: '', telefono: '' });
  guardandoProveedorRapido = signal(false);

  abrirProductoRapido() {
    this.nuevoProductoRapido.set({ nombre: this.busquedaProducto() || '', codigoBarras: '', precioCompra: 0 });
    this.mostrarModalProductoRapido.set(true);
  }

  guardarProductoRapido() {
    if (!this.nuevoProductoRapido().nombre) return this.toast.show('El nombre es obligatorio', 'error');
    this.guardandoProductoRapido.set(true);
    const payload = {
      nombre: this.nuevoProductoRapido().nombre,
      codigoBarras: this.nuevoProductoRapido().codigoBarras,
      precioCompra: this.nuevoProductoRapido().precioCompra,
      precioUnitario: this.nuevoProductoRapido().precioCompra,
      idCategoria: null
    };
    this.http.post<any>(environment.apiUrl + '/pos/productos', payload).subscribe({
      next: (res) => {
        this.toast.show('Producto creado rápidamente', 'success');
        this.guardandoProductoRapido.set(false);
        this.mostrarModalProductoRapido.set(false);
        this.cargarCatalogo();
        const prod = res.data || res;
        if (prod) this.agregarAlCarrito(prod);
        this.busquedaProducto.set('');
      },
      error: () => {
        this.toast.show('Error al crear producto', 'error');
        this.guardandoProductoRapido.set(false);
      }
    });
  }

  abrirProveedorRapido() {
    this.nuevoProveedorRapido.set({ nombre: '', rfc: '', telefono: '' });
    this.mostrarModalProveedorRapido.set(true);
  }

  guardarProveedorRapido() {
    if (!this.nuevoProveedorRapido().nombre) return this.toast.show('El nombre es obligatorio', 'error');
    this.guardandoProveedorRapido.set(true);
    this.http.post<any>(environment.apiUrl + '/pos/proveedores', this.nuevoProveedorRapido()).subscribe({
      next: (res) => {
        this.toast.show('Proveedor creado rápidamente', 'success');
        this.guardandoProveedorRapido.set(false);
        this.mostrarModalProveedorRapido.set(false);
        this.cargarProveedores();
        const prov = res.data || res;
        if (prov && prov.idProveedor) this.idProveedor.set(prov.idProveedor);
      },
      error: () => {
        this.toast.show('Error al crear proveedor', 'error');
        this.guardandoProveedorRapido.set(false);
      }
    });
  }`;
  
  ts = ts.replace(/importando = computed\(\(\) => this\.importandoXml\(\) \|\| this\.importandoPdf\(\)\);/, replacement);
}

fs.writeFileSync('src/app/features/compras/nueva-compra.component.ts', ts, 'utf8');

// HTML MODIFICATIONS
let html = fs.readFileSync('src/app/features/compras/nueva-compra.component.html', 'utf8');

html = html.replace(/<a href="\/productos\?modal=nuevo" target="_blank"/g, '<button (click)="abrirProductoRapido()"');
html = html.replace(/<a href="\/proveedores\?modal=nuevo" target="_blank"/g, '<button (click)="abrirProveedorRapido()"');

// Fix closing tags from </a> to </button>
html = html.replace(/<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"\/><\/svg>\s*Nuevo\s*<\/a>/g, '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>\n              Nuevo\n            </button>');
html = html.replace(/<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"\/><\/svg>\s*Nuevo\s*<\/a>/g, '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>\n                    Nuevo\n                  </button>');

const modals = `
<!-- Alta Rápida Producto Modal -->
@if (mostrarModalProductoRapido()) {
  <div class="modal-overlay z-[100]" (click)="mostrarModalProductoRapido.set(false)">
    <div class="modal-container flex flex-col slideInDown p-6 max-w-md" (click)="$event.stopPropagation()">
      <h2 class="text-xl font-bold mb-4 text-slate-800">Alta Rápida de Producto</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-1">Nombre del Producto <span class="text-red-500">*</span></label>
          <input type="text" [ngModel]="nuevoProductoRapido().nombre" (ngModelChange)="nuevoProductoRapido.update(v => ({...v, nombre: $event}))" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-amber-500">
        </div>
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-1">Código de Barras</label>
          <input type="text" [ngModel]="nuevoProductoRapido().codigoBarras" (ngModelChange)="nuevoProductoRapido.update(v => ({...v, codigoBarras: $event}))" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-amber-500" placeholder="Opcional">
        </div>
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-1">Costo Unitario</label>
          <input type="number" [ngModel]="nuevoProductoRapido().precioCompra" (ngModelChange)="nuevoProductoRapido.update(v => ({...v, precioCompra: $event}))" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-amber-500">
        </div>
      </div>
      <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
        <button (click)="mostrarModalProductoRapido.set(false)" class="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors">Cancelar</button>
        <button (click)="guardarProductoRapido()" [disabled]="guardandoProductoRapido()" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold transition-colors">
          Guardar y Agregar
        </button>
      </div>
    </div>
  </div>
}

<!-- Alta Rápida Proveedor Modal -->
@if (mostrarModalProveedorRapido()) {
  <div class="modal-overlay z-[100]" (click)="mostrarModalProveedorRapido.set(false)">
    <div class="modal-container flex flex-col slideInDown p-6 max-w-md" (click)="$event.stopPropagation()">
      <h2 class="text-xl font-bold mb-4 text-slate-800">Alta Rápida de Proveedor</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-1">Nombre / Razón Social <span class="text-red-500">*</span></label>
          <input type="text" [ngModel]="nuevoProveedorRapido().nombre" (ngModelChange)="nuevoProveedorRapido.update(v => ({...v, nombre: $event}))" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-amber-500">
        </div>
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-1">RFC</label>
          <input type="text" [ngModel]="nuevoProveedorRapido().rfc" (ngModelChange)="nuevoProveedorRapido.update(v => ({...v, rfc: $event}))" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-amber-500" placeholder="Opcional">
        </div>
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-1">Teléfono</label>
          <input type="text" [ngModel]="nuevoProveedorRapido().telefono" (ngModelChange)="nuevoProveedorRapido.update(v => ({...v, telefono: $event}))" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-amber-500" placeholder="Opcional">
        </div>
      </div>
      <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
        <button (click)="mostrarModalProveedorRapido.set(false)" class="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors">Cancelar</button>
        <button (click)="guardarProveedorRapido()" [disabled]="guardandoProveedorRapido()" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold transition-colors">
          Guardar y Seleccionar
        </button>
      </div>
    </div>
  </div>
}
`;

if (!html.includes('Alta Rápida Producto Modal')) {
  html += modals;
}

fs.writeFileSync('src/app/features/compras/nueva-compra.component.html', html, 'utf8');
console.log("Added Quick Add Modals and fixed XML FK issue!");
