const fs = require('fs');

let tsPath = 'src/app/features/cotizaciones/cotizaciones.ts';
let ts = fs.readFileSync(tsPath, 'utf8');

ts = ts.replace(
  `convertirAVenta(idCotizacion: number) {
    if (confirm('¿Estás seguro de convertir esta cotización a venta? Esto afectará el inventario.')) {
      this.posService.convertirCotizacionAVenta(idCotizacion).subscribe({`,
  `convertirAVenta(idCotizacion: number) {
    if (confirm('¿Estás seguro de convertir esta cotización a venta? Esto afectará el inventario.')) {
      let metodoPago = window.prompt('Ingresa el método de pago (Efectivo, Tarjeta, Transferencia):', 'Efectivo');
      if (!metodoPago) return; // Cancelado
      
      const metodosValidos = ['Efectivo', 'Tarjeta', 'Transferencia'];
      // Normalizar entrada
      metodoPago = metodoPago.trim();
      metodoPago = metodoPago.charAt(0).toUpperCase() + metodoPago.slice(1).toLowerCase();
      
      if (!metodosValidos.includes(metodoPago)) {
        this.toast.show('Método de pago inválido. Usa Efectivo, Tarjeta o Transferencia.', 'error');
        return;
      }

      this.posService.convertirCotizacionAVenta(idCotizacion, metodoPago).subscribe({`
);

// If the encoding/characters above mis-matched, we will use a regex to replace
const regex = /convertirAVenta\(idCotizacion:\s*number\)\s*\{\s*if\s*\(confirm\([^)]+\)\)\s*\{\s*this\.posService\.convertirCotizacionAVenta\(idCotizacion\)\.subscribe\(\{/m;

if (!ts.includes('window.prompt')) {
  ts = ts.replace(regex, `convertirAVenta(idCotizacion: number) {
    if (confirm('¿Estás seguro de convertir esta cotización a venta? Esto afectará el inventario.')) {
      let metodoPago = window.prompt('Ingresa el método de pago (Efectivo, Tarjeta, Transferencia):', 'Efectivo');
      if (!metodoPago) return;
      metodoPago = metodoPago.trim();
      metodoPago = metodoPago.charAt(0).toUpperCase() + metodoPago.slice(1).toLowerCase();
      if (!['Efectivo', 'Tarjeta', 'Transferencia'].includes(metodoPago)) {
        this.toast.show('Método de pago inválido.', 'error');
        return;
      }
      this.posService.convertirCotizacionAVenta(idCotizacion, metodoPago).subscribe({`);
}

fs.writeFileSync(tsPath, ts, 'utf8');
console.log('Fixed cotizaciones.ts frontend to prompt for method');
