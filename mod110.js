const fs = require('fs');
let tsPath = 'src/app/core/services/pos.service.ts';
let ts = fs.readFileSync(tsPath, 'utf8');

ts = ts.replace(
  /const nuevaCantidad = item\.cantidad \+ delta;\s*if\s*\(nuevaCantidad\s*<=\s*0\)\s*return\s*null;/g,
  `let nuevaCantidad = item.cantidad + delta;
            if (nuevaCantidad <= 0) nuevaCantidad = 0; // Don't delete, just clamp to 0`
);

fs.writeFileSync(tsPath, ts, 'utf8');
console.log('Fixed cambiarCantidad to not delete on 0');
