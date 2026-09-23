const fs = require('fs');

// Fix 2: pos.service.ts (frontend) - prevent deletion when quantity = 0 while typing
let ts = fs.readFileSync('src/app/core/services/pos.service.ts', 'utf8');

// Change setCantidadExacta to not delete on 0 (allow empty/0 while editing)
ts = ts.replace(
  `setCantidadExacta(uid: string, cantidad: number) {
    if (cantidad === null || isNaN(cantidad) || cantidad <= 0) {
      this.eliminarDelCarrito(uid);
      return;
    }`,
  `setCantidadExacta(uid: string, cantidad: number) {
    // Do NOT remove if 0 - user might be typing a 2-digit number
    if (cantidad === null || isNaN(cantidad)) {
      return; // just ignore, let user keep typing
    }
    if (cantidad <= 0) {
      return; // allow 0 while editing, removal only via explicit delete button
    }`
);

fs.writeFileSync('src/app/core/services/pos.service.ts', ts, 'utf8');
console.log('Fixed frontend: qty=0 no longer removes item');
