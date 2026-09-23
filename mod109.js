const fs = require('fs');

let tsPath = 'src/app/core/services/pos.service.ts';
let ts = fs.readFileSync(tsPath, 'utf8');

// Replace the specific elimination block in setCantidadExacta
ts = ts.replace(
  /setCantidadExacta\(uid:\s*string,\s*cantidad:\s*number\)\s*\{\s*if\s*\(cantidad\s*===\s*null\s*\|\|\s*isNaN\(cantidad\)\s*\|\|\s*cantidad\s*<=\s*0\)\s*\{\s*this\.eliminarDelCarrito\(uid\);\s*return;\s*\}/,
  `setCantidadExacta(uid: string, cantidad: number) {
    if (cantidad === null || isNaN(cantidad) || cantidad <= 0) {
      // Just update it to 0 so the user can keep typing, but do not delete
      this._carrito.update(items => items.map(item => {
        if (item.uid !== uid) return item;
        return { ...item, cantidad: 0, subtotal: 0 }; // Temporarily 0
      }));
      return;
    }`
);

fs.writeFileSync(tsPath, ts, 'utf8');
console.log('Fixed setCantidadExacta properly this time');
