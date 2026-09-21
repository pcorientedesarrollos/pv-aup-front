const fs = require('fs');
let html = fs.readFileSync('src/app/features/compras/compras.component.html', 'utf8');

// Replace the table row calculations in conceptos facturados
let target = `<td class="px-6 py-4 text-right text-gray-600 font-medium">
                    {{ det.precioCosto | currency }}
                  </td>
                  <td class="px-6 py-4 text-right font-bold text-gray-900">
                    {{ (det.cantidad * det.precioCosto) | currency }}
                  </td>
                  <td class="px-6 py-4 text-right text-gray-500 text-[11px]">
                    {{ (det.cantidad * det.precioCosto * 0.16) | currency }}
                  </td>
                  <td class="px-6 py-4 text-right font-black text-gray-900">
                    {{ (det.cantidad * det.precioCosto * 1.16) | currency }}
                  </td>`;

let replacement = `<td class="px-6 py-4 text-right text-gray-600 font-medium">
                    {{ (det.precioCosto / 1.16) | currency }}
                  </td>
                  <td class="px-6 py-4 text-right font-bold text-gray-900">
                    {{ (det.cantidad * (det.precioCosto / 1.16)) | currency }}
                  </td>
                  <td class="px-6 py-4 text-right text-gray-500 text-[11px]">
                    {{ ((det.cantidad * det.precioCosto) - (det.cantidad * (det.precioCosto / 1.16))) | currency }}
                  </td>
                  <td class="px-6 py-4 text-right font-black text-gray-900">
                    {{ (det.cantidad * det.precioCosto) | currency }}
                  </td>`;

html = html.replace(target, replacement);
fs.writeFileSync('src/app/features/compras/compras.component.html', html, 'utf8');
console.log('Fixed compras.component.html');
