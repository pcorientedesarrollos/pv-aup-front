const fs = require('fs');

function fixFile(path) {
  let html = fs.readFileSync(path, 'utf8');
  
  // 1. Change pb-32 to pb-64 and increase min-h
  html = html.replace(/pb-32/g, 'pb-64');
  html = html.replace(/min-h-\[300px\]/g, 'min-h-[400px]');
  html = html.replace(/min-h-\[350px\]/g, 'min-h-[400px]');
  
  // 2. Remove the ngClass completely and add 'top-full mt-1' to the regular class attribute
  // Example: class="... z-[60]" [ngClass]="..."
  // Becomes: class="... z-[60] top-full mt-1"
  html = html.replace(/z-\[60\]"[^>]*\[ngClass\]="[^"]+"/g, 'z-[60] top-full mt-1"');

  fs.writeFileSync(path, html, 'utf8');
  console.log('Fixed', path);
}

fixFile('src/app/features/cotizaciones/cotizaciones.html');
fixFile('src/app/features/historial/historial.component.html');
