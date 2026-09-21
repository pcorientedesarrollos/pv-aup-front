const fs = require('fs');
let ts = fs.readFileSync('src/app/core/services/ticket-printer.service.ts', 'utf8');

let replaced = ts.replace(/<div class="item">\s*<span>Devoluciones:<\/span>[\s\S]*?TOTAL ESPERADO \(EF\):<\/span>\s*<span>\$\$\{Number\(data\.totalTeoricoFisico \|\| 0\)\.toFixed\(2\)\}<\/span>\s*<\/div>/, `<div class="item">
          <span>Devoluciones:</span>
          <span>$${Number(data.totalCancelado || data.devoluciones || 0).toFixed(2)}</span>
        </div>
        <div class="item">
          <span>(-) Gastos Turno:</span>
          <span>-$${Number(data.salidas || data.totalGastos || 0).toFixed(2)}</span>
        </div>

        <div class="divider"></div>
        
        <div class="item bold">
          <span>ESPERADO EN CAJÓN (EF):</span>
          <span>$${Number((data.fondoCaja || data.montoApertura || 0) + (data.ventasEfectivo || data.totalEfectivo || 0) - (data.salidas || data.totalGastos || 0)).toFixed(2)}</span>
        </div>`);

if (replaced === ts) {
  console.log("NOT REPLACED");
} else {
  fs.writeFileSync('src/app/core/services/ticket-printer.service.ts', replaced, 'utf8');
  console.log("Fixed ticket-printer.service.ts");
}
