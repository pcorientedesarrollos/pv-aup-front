const fs = require('fs');
let ts = fs.readFileSync('src/app/features/compras/nueva-compra.component.ts', 'utf8');

ts = ts.replace('async procesarFacturaResponse(res: any) {', 'async procesarFacturaResponse(res: any) {\n    this.tasaIva.set(0); // El costo unitario de XML/PDF ya trae el IVA inyectado, as\u00ED que el subtotal ya es el total\n');

fs.writeFileSync('src/app/features/compras/nueva-compra.component.ts', ts, 'utf8');
console.log('Fixed double IVA issue.');
