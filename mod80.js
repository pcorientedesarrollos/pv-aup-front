const fs = require('fs');
let ts = fs.readFileSync('src/app/features/compras/nueva-compra.component.ts', 'utf8');

// Change montoIva and totalFinal logic to treat totalCompra as IVA-inclusive
let target = `montoIva = computed(() => {
    return this.totalCompra() * (this.tasaIva() / 100);
  });

  totalFinal = computed(() => {
    return this.totalCompra() + this.montoIva();
  });`;

let replacement = `montoIva = computed(() => {
    const total = this.totalCompra();
    const tasa = this.tasaIva() / 100;
    // Si la tasa es > 0, asumimos que totalCompra YA incluye el IVA y hacemos el desglose inverso.
    return total - (total / (1 + tasa));
  });

  totalFinal = computed(() => {
    // totalCompra ya es el total con IVA incluido
    return this.totalCompra();
  });
  
  subtotalDesglosado = computed(() => {
    return this.totalCompra() - this.montoIva();
  });`;

ts = ts.replace(target, replacement);
fs.writeFileSync('src/app/features/compras/nueva-compra.component.ts', ts, 'utf8');
console.log('Fixed nueva-compra.component.ts');
