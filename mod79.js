const fs = require('fs');
let ts = fs.readFileSync('src/app/features/compras/nueva-compra.component.ts', 'utf8');

ts = ts.replace(/actualizarCosto: false/g, 'actualizarCosto: true');

fs.writeFileSync('src/app/features/compras/nueva-compra.component.ts', ts, 'utf8');
console.log('Fixed nueva-compra.component.ts');
