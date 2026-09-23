const fs = require('fs');
let ts = fs.readFileSync('src/app/features/productos/productos.component.ts', 'utf8');

// Add idCategoria to the payload in guardarDatosGenerales
ts = ts.replace(
  "      unidadMedida: this.nuevoProducto.unidadMedida\r\n    }",
  "      unidadMedida: this.nuevoProducto.unidadMedida,\r\n      idCategoria: this.nuevoProducto.idCategoria ?? null\r\n    }"
);

// Handle unix line endings too
ts = ts.replace(
  "      unidadMedida: this.nuevoProducto.unidadMedida\n    }",
  "      unidadMedida: this.nuevoProducto.unidadMedida,\n      idCategoria: this.nuevoProducto.idCategoria ?? null\n    }"
);

fs.writeFileSync('src/app/features/productos/productos.component.ts', ts, 'utf8');
console.log('Fixed: idCategoria added to guardarDatosGenerales payload');
