const fs = require('fs');
const files = [
  'src/app/features/compras/nueva-compra.component.html',
  'src/app/features/cotizaciones/nueva-cotizacion/nueva-cotizacion.html',
  'src/app/features/pos/catalogo/catalogo.component.html',
  'src/app/features/proveedores/proveedores.component.ts',
  'src/app/features/productos/productos.component.ts',
  'src/app/features/productos/productos.component.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let t = fs.readFileSync(f, 'utf8');
    t = t.replace(/cdigo/g, 'código');
    t = t.replace(/catlogo/g, 'catálogo');
    t = t.replace(/quiǸn/g, 'quién');
    t = t.replace(/Cǭmara/g, 'Cámara');
    // For specific things like close buttons
    t = t.replace(/>o <\/button>/g, '>×</button>');
    t = t.replace(/Y"</g, '⚙️');
    t = t.replace(/categora/g, 'categoría');
    fs.writeFileSync(f, t, 'utf8');
  }
});
console.log("Fixed encoding symbols");
