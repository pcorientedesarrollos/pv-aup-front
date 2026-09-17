const fs = require('fs');

// 1. Fix corte-caja.component.ts literal \\n
let corte = fs.readFileSync('src/app/features/corte-caja/corte-caja.component.ts', 'utf-8');
corte = corte.replace('this.montoApertura(),\\\\n      idUsuario:', 'this.montoApertura(),\\n      idUsuario:');
corte = corte.replace('this.montoApertura(),\\\\r\\\\n      idUsuario:', 'this.montoApertura(),\\n      idUsuario:');
corte = corte.replace('this.montoApertura(),\\n      idUsuario:', 'this.montoApertura(), idUsuario:');
corte = corte.replace('montoApertura: this.montoApertura(),\\\\n      idUsuario: this.auth.sesion()?.idUsuario', 'montoApertura: this.montoApertura(), idUsuario: this.auth.sesion()?.idUsuario');
fs.writeFileSync('src/app/features/corte-caja/corte-caja.component.ts', corte, 'utf-8');

// 2. Fix gastos.component.html 
let gastos = fs.readFileSync('src/app/features/gastos/gastos.component.html', 'utf-8');
gastos = gastos.replace('(ngModelChange)="idCategoria.set()"', '(ngModelChange)="idCategoria.set(\\)"');
fs.writeFileSync('src/app/features/gastos/gastos.component.html', gastos, 'utf-8');

// 3. Fix dashboard.ts (BaseChartDirective is not used within the template)
// Wait, if BaseChartDirective is imported in dashboard.ts but not used in dashboard.html, it's an error in standalone components.
// We should remove it from dashboard.ts imports!
let dash = fs.readFileSync('src/app/features/dashboard/dashboard.ts', 'utf-8');
dash = dash.replace('BaseChartDirective', '');
dash = dash.replace(', ,', ','); // cleanup just in case
dash = dash.replace(',]', ']');
fs.writeFileSync('src/app/features/dashboard/dashboard.ts', dash, 'utf-8');
