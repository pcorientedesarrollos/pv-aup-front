const fs = require('fs');

function fixFile(file) {
  let t = fs.readFileSync(file, 'utf8');
  // It's not \ufffd, it's actually parsed as something else. Let's find all occurrences of "c" followed by any weird char followed by "digo"
  t = t.replace(/c.digo/g, 'código');
  t = t.replace(/cat.logo/g, 'catálogo');
  t = t.replace(/qui.n/g, 'quién');
  t = t.replace(/C.mara/g, 'Cámara');
  t = t.replace(/>.o <\/button>/g, '>×</button>');
  t = t.replace(/.Y"</g, '⚙️');
  t = t.replace(/categor.a/g, 'categoría');
  fs.writeFileSync(file, t, 'utf8');
}

const files = [
  'src/app/features/compras/nueva-compra.component.html',
  'src/app/features/cotizaciones/nueva-cotizacion/nueva-cotizacion.html',
  'src/app/features/pos/catalogo/catalogo.component.html',
  'src/app/features/proveedores/proveedores.component.ts',
  'src/app/features/productos/productos.component.ts',
  'src/app/features/productos/productos.component.html'
];

files.forEach(fixFile);
console.log("Fixed encoding symbols with generic dot");
