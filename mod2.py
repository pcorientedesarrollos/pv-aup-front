import re

with open('src/app/features/corte-caja/corte-caja.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Remove Cajero column
text = re.sub(r'<th[^>]*>Cajero</th>', '', text)
text = text.replace('<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ corte.usuario?.nombreUsuario }}</td>', '')
text = text.replace('<td colspan="6" class="empty-state italic">', '<td colspan="5" class="empty-state italic">')

# 2. Add Compras block
comprasBlock = '''
        @if (corteSeleccionado().compras?.length > 0) {
          <div class="mt-6">
            <h4 class="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">Compras a Proveedores en el Turno</h4>
            <div class="overflow-x-auto rounded-lg border border-slate-200">
              <table class="w-full text-sm text-left">
                <thead class="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th class="py-2 px-3">Folio</th>
                    <th class="py-2 px-3">Fecha</th>
                    <th class="py-2 px-3">Proveedor</th>
                    <th class="py-2 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  @for (c of corteSeleccionado().compras; track c.idCompra) {
                    <tr class="hover:bg-slate-50">
                      <td class="py-2 px-3 text-slate-700 font-medium">{{ c.folio }}</td>
                      <td class="py-2 px-3 text-slate-600">{{ c.fechaCompra | date:'dd/MM/yyyy HH:mm' }}</td>
                      <td class="py-2 px-3 text-slate-600">{{ c.proveedor ? c.proveedor.nombre : 'Sin Proveedor' }}</td>
                      <td class="py-2 px-3 text-right font-bold text-slate-800">{{ c.total | currency }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
'''

gastosIndex = text.find('@if (corteSeleccionado().gastos?.length > 0) {')
if gastosIndex != -1:
    text = text[:gastosIndex] + comprasBlock + text[gastosIndex:]

with open('src/app/features/corte-caja/corte-caja.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
