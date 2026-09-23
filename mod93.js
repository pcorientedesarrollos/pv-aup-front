const fs = require('fs');
let ts = fs.readFileSync('src/app/features/pos/apertura-caja/apertura-caja.component.ts', 'utf8');

ts = ts.replace("import { AuthService } from '../../../core/services/auth.service';", "import { AuthService } from '../../../core/services/auth.service';\nimport { Router } from '@angular/router';");

// Add router to constructor
ts = ts.replace("private pos: PosService", "private pos: PosService,\n    private router: Router");

// Add turnoAntiguoAbierto
ts = ts.replace("nombreCajero = '';", "nombreCajero = '';\n  turnoAntiguoAbierto = false;\n  fechaTurnoAntiguo = '';");

// Change logic in ngOnInit
let initLogic = `
        next: (turno) => {
          this.cargando.set(false);
          if (turno) {
            const tzOffset = (new Date()).getTimezoneOffset() * 60000;
            const hoy = new Date(Date.now() - tzOffset).toISOString().slice(0, 10);
            const fechaTurno = new Date(new Date(turno.fechaApertura).getTime() - tzOffset).toISOString().slice(0, 10);
            
            if (fechaTurno < hoy) {
              this.error.set(\`Tienes un turno abierto del día \${new Date(turno.fechaApertura).toLocaleDateString()}. Debes realizar el corte de caja antes de continuar.\`);
              this.turnoAntiguoAbierto = true;
              this.fechaTurnoAntiguo = fechaTurno;
            } else {
              this.auth.marcarTurnoAbierto();
            }
          }
        },
`;

ts = ts.replace(/next:\s*\(turno\)\s*=>\s*\{[\s\S]*?this\.auth\.marcarTurnoAbierto\(\);\s*\}\s*\},/, initLogic);

// Add method to go to corte
ts = ts.replace(/abrirTurno\(\)\s*\{/, "irACorteDeCaja() {\n    this.router.navigate(['/corte-caja']);\n  }\n\n  abrirTurno() {");

fs.writeFileSync('src/app/features/pos/apertura-caja/apertura-caja.component.ts', ts, 'utf8');
console.log('Fixed apertura-caja.component.ts');
