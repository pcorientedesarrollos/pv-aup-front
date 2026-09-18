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
    t = t.replace(/c\ufffddigo/g, 'código');
    t = t.replace(/cat\ufffdlogo/g, 'catálogo');
    t = t.replace(/qui\ufffdn/g, 'quién');
    t = t.replace(/C\ufffdmara/g, 'Cámara');
    t = t.replace(/>\ufffdo <\/button>/g, '>×</button>');
    t = t.replace(/\ufffdY"</g, '⚙️');
    t = t.replace(/categor\ufffda/g, 'categoría');
    fs.writeFileSync(f, t, 'utf8');
  }
});
console.log("Fixed encoding symbols with unicode");
