const fs = require('fs');

let servicePath = 'src/app/core/services/pos.service.ts';
let ts = fs.readFileSync(servicePath, 'utf8');

ts = ts.replace(
  /convertirCotizacionAVenta\(idCotizacion:\s*number\)\s*\{\s*return\s*this\.http\.patch<any>\(`\$\{this\.API\}\/pos\/cotizaciones\/\$\{idCotizacion\}\/convertir`,\s*\{\}\);\s*\}/,
  `convertirCotizacionAVenta(idCotizacion: number, metodoPago: string = 'Efectivo') {
    return this.http.patch<any>(\`\${this.API}/pos/cotizaciones/\${idCotizacion}/convertir\`, { metodoPago });
  }`
);

fs.writeFileSync(servicePath, ts, 'utf8');
console.log('Fixed pos.service properly with regex');
