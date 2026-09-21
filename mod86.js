const fs = require('fs');
let ts = fs.readFileSync('src/app/features/compras/nueva-compra.component.ts', 'utf8');

// replace the hardcoded reset
ts = ts.replace("this.tasaIva.set(0);", "// removed forced 0% IVA");

fs.writeFileSync('src/app/features/compras/nueva-compra.component.ts', ts, 'utf8');
console.log('Fixed nueva-compra.component.ts');
