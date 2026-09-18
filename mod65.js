const fs = require('fs');

let ts = fs.readFileSync('src/app/features/compras/nueva-compra.component.ts', 'utf8');

// Add tasaIva and montoIva signals
if (!ts.includes('tasaIva = signal')) {
  ts = ts.replace(/totalCompra = computed\(\(\) => \{/, `tasaIva = signal<number>(16); // Default 16% as requested

  montoIva = computed(() => {
    return this.totalCompra() * (this.tasaIva() / 100);
  });

  totalFinal = computed(() => {
    return this.totalCompra() + this.montoIva();
  });

  totalCompra = computed(() => {`);

  // Replace this.totalCompra() with this.totalFinal() in payload
  ts = ts.replace(/total: this\.totalCompra\(\),/, 'total: this.totalFinal(),');
}

fs.writeFileSync('src/app/features/compras/nueva-compra.component.ts', ts, 'utf8');

let html = fs.readFileSync('src/app/features/compras/nueva-compra.component.html', 'utf8');

// Replace Resumen de Compra hardcoded IVA
const oldResumen = /<div class="space-y-3 border-b border-slate-700 pb-4 mb-4">[\s\S]*?<span class="text-slate-400 font-medium">Total<\/span>[\s\S]*?<\/div>/;

const newResumen = `<div class="space-y-3 border-b border-slate-700 pb-4 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Subtotal</span>
              <span>{{ totalCompra() | currency:'MXN' }}</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-slate-400">Tasa de IVA</span>
              <select [ngModel]="tasaIva()" (ngModelChange)="tasaIva.set($event)" class="bg-slate-800 text-white border border-slate-600 rounded px-2 py-1 text-right text-sm outline-none focus:border-amber-500">
                <option [ngValue]="0">0% (Exento / Ya Incluido)</option>
                <option [ngValue]="16">16% (General)</option>
                <option [ngValue]="8">8% (Frontera)</option>
              </select>
            </div>
            @if (tasaIva() > 0) {
              <div class="flex justify-between text-sm text-slate-300">
                <span>Monto IVA</span>
                <span>{{ montoIva() | currency:'MXN' }}</span>
              </div>
            }
          </div>

          <div class="flex justify-between items-end mb-6">
            <span class="text-slate-400 font-medium">Total Factura</span>
            <span class="text-3xl font-black text-amber-500">{{ totalFinal() | currency:'MXN' }}</span>
          </div>`;

if (!html.includes('Tasa de IVA')) {
  html = html.replace(oldResumen, newResumen);
}

fs.writeFileSync('src/app/features/compras/nueva-compra.component.html', html, 'utf8');
console.log("Added IVA toggle to Resumen de Compra");
