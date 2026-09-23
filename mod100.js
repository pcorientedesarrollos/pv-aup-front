const fs = require('fs');

// Fix 1: cotizaciones.html - Change dropdown from CSS hover to click-based
let html = fs.readFileSync('src/app/features/cotizaciones/cotizaciones.html', 'utf8');

// Replace the group-hover dropdown with a click-based one using Angular
html = html.replace(
  `<div class="relative group inline-block text-left">
                    <button class="p-2 text-gray-400 hover:text-indigo-600 focus:outline-none transition-colors rounded-full hover:bg-indigo-50" title="Acciones">`,
  `<div class="relative inline-block text-left" (click)="$event.stopPropagation()">
                    <button (click)="menuAbierto === cot.idCotizacion ? menuAbierto = null : menuAbierto = cot.idCotizacion" class="p-2 text-gray-400 hover:text-indigo-600 focus:outline-none transition-colors rounded-full hover:bg-indigo-50" title="Acciones">`
);

// Replace the hover-based visibility with conditional
html = html.replace(
  `<div class="absolute right-0 w-56 bg-white border border-gray-200 divide-y divide-slate-100 rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]" [ngClass]="(i >= count - 2 && count > 3) ? 'bottom-full mb-1' : 'top-full mt-1'">`,
  `<div class="absolute right-0 w-56 bg-white border border-gray-200 divide-y divide-slate-100 rounded-md shadow-2xl z-[60]" [ngClass]="(i >= count - 2 && count > 3) ? 'bottom-full mb-1' : 'top-full mt-1'" *ngIf="menuAbierto === cot.idCotizacion">`
);

fs.writeFileSync('src/app/features/cotizaciones/cotizaciones.html', html, 'utf8');
console.log('Fixed cotizaciones.html dropdown');

// Fix 2: nueva-cotizacion.ts - fix currency direction
// When USD is selected, the MXN price should be DIVIDED by the exchange rate
// so the final price in MXN = precioCompra (MXN already) * factorUtilidad  
// The "USD" mode means: show the price in USD terms, so we need to DIVIDE
let ts = fs.readFileSync('src/app/features/cotizaciones/nueva-cotizacion/nueva-cotizacion.ts', 'utf8');

// Fix recalcularFila: USD = divide (price is in MXN, cotize in USD, so divide at end)
// Actually user says: "precio de compra está en MXN, quiero que al poner USD lo divida"
// So the base price stays in MXN, but the displayed price is in USD = MXN / tipoCambio
// So the calculation: precioVenta en MXN = precioCompra * utilidad, but DISPLAY in USD = /tipoCambio
// But looking at the current code, it multiplies USD to get MXN... 
// The user wants: price is in MXN, select USD -> divide by TC so price IS in USD
// So: basePriceUSD = precioCompra / tipoCambio, then precioVenta en USD = basePriceUSD * utilidad

ts = ts.replace(
  `recalcularFila(item: any) {
    let basePriceMXN = Number(item.precioCompra);
    if (item.moneda === 'USD') {
      basePriceMXN = basePriceMXN * Number(item.tipoCambio || this.tipoCambio());
    }
    const factorUtilidad = 1 + (Number(item.utilidadPorcentaje) / 100);
    item.precioVenta = basePriceMXN * factorUtilidad;
    item.ganancia = item.precioVenta - basePriceMXN;
  }`,
  `recalcularFila(item: any) {
    // precioCompra always in MXN. If moneda === USD, convert to USD by dividing
    const precioMXN = Number(item.precioCompra);
    const tc = Number(item.tipoCambio || this.tipoCambio());
    let basePrice = item.moneda === 'USD' ? precioMXN / tc : precioMXN;
    const factorUtilidad = 1 + (Number(item.utilidadPorcentaje) / 100);
    item.precioVenta = basePrice * factorUtilidad;
    item.ganancia = item.precioVenta - basePrice;
  }`
);

// Also fix costoBase computed (for the summary footer)
ts = ts.replace(
  `if (item.moneda === 'USD') base *= Number(item.tipoCambio || this.tipoCambio());`,
  `if (item.moneda === 'USD') base /= Number(item.tipoCambio || this.tipoCambio());`
);

fs.writeFileSync('src/app/features/cotizaciones/nueva-cotizacion/nueva-cotizacion.ts', ts, 'utf8');
console.log('Fixed nueva-cotizacion.ts currency direction');
