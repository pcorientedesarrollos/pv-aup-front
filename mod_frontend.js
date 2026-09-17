const fs = require('fs');
let html = fs.readFileSync('src/app/features/corte-caja/corte-caja.component.html', 'utf8');

const ventasSection = 
        @if (corteSeleccionado().ventas?.length > 0) {
          <div class="mt-4">
            <h4 class="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">Ventas Registradas en el Turno</h4>
            <div class="overflow-x-auto rounded-lg border border-slate-200">
              <table class="w-full text-left text-sm whitespace-nowrap">
                <thead class="text-slate-500 bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th class="py-2 px-3">Folio</th>
                    <th class="py-2 px-3">Fecha/Hora</th>
                    <th class="py-2 px-3">Cliente</th>
                    <th class="py-2 px-3">Método</th>
                    <th class="py-2 px-3">Estatus</th>
                    <th class="py-2 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  @for (v of corteSeleccionado().ventas; track v.idVenta) {
                    <tr class="hover:bg-slate-50">
                      <td class="py-2 px-3 text-slate-700 font-medium">{{ v.folio }}</td>
                      <td class="py-2 px-3 text-slate-600">{{ v.fechaVenta | date:'dd/MM/yyyy HH:mm' }}</td>
                      <td class="py-2 px-3 text-slate-600">{{ v.cliente ? v.cliente.nombre : 'Público General' }}</td>
                      <td class="py-2 px-3 text-slate-600">{{ v.metodoPago }}</td>
                      <td class="py-2 px-3">
                        <span class="px-2 py-0.5 rounded text-xs font-semibold"
                          [ngClass]="v.estatus === 'Completada' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'">
                          {{ v.estatus }}
                        </span>
                      </td>
                      <td class="py-2 px-3 text-right font-bold"
                        [ngClass]="v.estatus === 'Completada' ? 'text-slate-800' : 'text-slate-400 line-through'">
                        {{ v.totalPagado | currency }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
;

// Insert the ventasSection after the grid of summary cards
html = html.replace('</div>\n\n        @if (corteSeleccionado().gastos?.length > 0)', '</div>\n\n' + ventasSection + '\n        @if (corteSeleccionado().gastos?.length > 0)');

fs.writeFileSync('src/app/features/corte-caja/corte-caja.component.html', html, 'utf8');
