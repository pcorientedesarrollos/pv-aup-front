const fs = require('fs');
let ts = fs.readFileSync('src/app/features/cotizaciones/cotizaciones.ts', 'utf8');

// Add menuAbierto property
ts = ts.replace(
  "export class CotizacionesComponent implements OnInit {",
  "export class CotizacionesComponent implements OnInit {\n  menuAbierto: number | null = null;\n"
);

// Add HostListener to close on outside click
if (!ts.includes("HostListener")) {
  ts = ts.replace(
    "import { Component,",
    "import { Component, HostListener,"
  );
  
  ts = ts.replace(
    "menuAbierto: number | null = null;",
    "menuAbierto: number | null = null;\n\n  @HostListener('document:click')\n  cerrarMenus() { this.menuAbierto = null; }"
  );
}

fs.writeFileSync('src/app/features/cotizaciones/cotizaciones.ts', ts, 'utf8');
console.log('Fixed cotizaciones.ts');
