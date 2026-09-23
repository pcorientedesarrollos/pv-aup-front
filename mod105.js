const fs = require('fs');

let servicePath = 'src/app/core/services/pos.service.ts';
let ts = fs.readFileSync(servicePath, 'utf8');

ts = ts.replace(
  `convertirCotizacionAVenta(idCotizacion: number) {
    return this.http.patch<any>(\`\${this.API}/pos/cotizaciones/\${idCotizacion}/convertir\`, {});
  }`,
  `convertirCotizacionAVenta(idCotizacion: number, metodoPago: string = 'Efectivo') {
    return this.http.patch<any>(\`\${this.API}/pos/cotizaciones/\${idCotizacion}/convertir\`, { metodoPago });
  }`
);

fs.writeFileSync(servicePath, ts, 'utf8');
console.log('Fixed frontend pos.service to send metodoPago');
