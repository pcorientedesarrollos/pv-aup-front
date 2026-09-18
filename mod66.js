const fs = require('fs');

let html = fs.readFileSync('src/app/features/compras/nueva-compra.component.html', 'utf8');

const targetStr = `<div class="space-y-3 border-b border-slate-700 pb-4 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Subtotal</span>
              <span>{{ totalCompra() | currency:'MXN' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">IVA</span>
              <span>Incluido</span>
            </div>
          </div>

          <div class="flex justify-between items-end mb-6">
            <span class="text-slate-400 font-medium">Total</span>
            <div class="text-right">
              <span class="text-xs text-slate-400 block uppercase">MXN</span>
              <span class="text-3xl font-bold text-yellow-400">{{ totalCompra() | currency:'MXN' }}</span>
            </div>
          </div>`;

const newStr = `<div class="space-y-3 border-b border-slate-700 pb-4 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Subtotal</span>
              <span>{{ totalCompra() | currency:'MXN' }}</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-slate-400">Tasa de IVA</span>
              <select [ngModel]="tasaIva()" (ngModelChange)="tasaIva.set(+$event)" class="bg-slate-700 text-white border-none rounded px-2 py-1 text-right text-sm outline-none focus:ring-1 focus:ring-amber-500">
                <option value="0">0% (Exento/Incluido)</option>
                <option value="16">16%</option>
                <option value="8">8% (Frontera)</option>
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
            <span class="text-slate-400 font-medium">Total</span>
            <div class="text-right">
              <span class="text-xs text-slate-400 block uppercase">MXN</span>
              <span class="text-3xl font-bold text-yellow-400">{{ totalFinal() | currency:'MXN' }}</span>
            </div>
          </div>`;

// Replace normalizing line endings to avoid failure
html = html.replace(targetStr.replace(/\r/g, ''), newStr.replace(/\r/g, ''));
html = html.replace(targetStr, newStr);

fs.writeFileSync('src/app/features/compras/nueva-compra.component.html', html, 'utf8');
console.log("HTML successfully updated");
