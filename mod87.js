const fs = require('fs');
let ts = fs.readFileSync('src/app/core/services/ticket-printer.service.ts', 'utf8');

let target = `<div class="item">
          <span>Devoluciones:</span>
            <span>\${Number(data.totalCancelado || data.devoluciones || 0).toFixed(2)}</span>
          </div>
          <div class="item">
            <span>(-) Gastos Turno:</span>
            <span>-\${Number(data.totalGastos || 0).toFixed(2)}</span>
          <!-- REPLACED -->
          <span>$$\${Number(data.totalCancelado || data.devoluciones || 0).toFixed(2)}</span>
        </div>

        <div class="divider"></div>
        
        <div class="item bold">
          <span>TOTAL ESPERADO (EF):</span>
          <span>$$\${Number(data.totalTeoricoFisico || 0).toFixed(2)}</span>
        </div>`;

let replacement = `<div class="item">
          <span>Devoluciones:</span>
          <span>$$\${Number(data.totalCancelado || data.devoluciones || 0).toFixed(2)}</span>
        </div>
        <div class="item">
          <span>(-) Gastos Turno:</span>
          <span>-$$\${Number(data.salidas || data.totalGastos || 0).toFixed(2)}</span>
        </div>

        <div class="divider"></div>
        
        <div class="item bold">
          <span>TOTAL ESPERADO EN CAJÓN:</span>
          <span>$$\${Number((data.fondoCaja || data.montoApertura || 0) + (data.ventasEfectivo || data.totalEfectivo || 0) - (data.salidas || data.totalGastos || 0)).toFixed(2)}</span>
        </div>`;

if (!ts.includes(target)) {
  console.log("TARGET NOT FOUND");
} else {
  ts = ts.replace(target, replacement);
  fs.writeFileSync('src/app/core/services/ticket-printer.service.ts', ts, 'utf8');
  console.log("Fixed ticket-printer.service.ts");
}
