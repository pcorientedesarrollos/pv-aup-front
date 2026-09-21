const fs = require('fs');
let html = fs.readFileSync('src/app/features/compras/nueva-compra.component.html', 'utf8');

html = html.replace(/<span class="text-slate-400">Subtotal<\/span>\s*<span>\{\{ totalCompra\(\) \| currency:'MXN' \}\}<\/span>/, '<span class="text-slate-400">Subtotal</span>\n              <span>{{ subtotalDesglosado() | currency:\'MXN\' }}</span>');

fs.writeFileSync('src/app/features/compras/nueva-compra.component.html', html, 'utf8');
console.log('Fixed nueva-compra.component.html');
