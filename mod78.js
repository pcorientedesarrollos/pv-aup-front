const fs = require('fs');
let ts = fs.readFileSync('src/app/features/productos/productos.component.ts', 'utf8');

ts = ts.replace(/precioCompra: prod\.precioCompra \|\| prod\.precioUnitario \|\| 0,/g, 'precioCompra: Number(prod.precioCompra) || Number(prod.precioUnitario) || 0,');
ts = ts.replace(/precioVenta: prod\.precioVenta \|\| prod\.precioPublico \|\| 0,/g, 'precioVenta: Number(prod.precioVenta) || Number(prod.precioPublico) || 0,');
ts = ts.replace(/precioPublico: /g, 'precioPublico: '); // Wait, let me just do a targeted replace for idCategoria as well

// Add idCategoria to guardarDatosGenerales
let guardarBody = ts.indexOf('private guardarDatosGenerales(id: number) {');
let payloadEnd = ts.indexOf('};', guardarBody);
if(guardarBody !== -1 && payloadEnd !== -1) {
    let before = ts.slice(0, payloadEnd);
    let after = ts.slice(payloadEnd);
    if (!before.includes('idCategoria:')) {
        ts = before + ',\n        idCategoria: this.nuevoProducto.idCategoria ? Number(this.nuevoProducto.idCategoria) : null' + after;
    }
}

fs.writeFileSync('src/app/features/productos/productos.component.ts', ts, 'utf8');
console.log('Fixed productos.component.ts');
