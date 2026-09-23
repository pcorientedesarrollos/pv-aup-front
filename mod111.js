const fs = require('fs');
let tsPath = 'src/app/features/cotizaciones/cotizaciones.html';
let html = fs.readFileSync(tsPath, 'utf8');

// Replace overflow-x-auto with md:overflow-visible overflow-x-auto pb-32 min-h-[300px]
html = html.replace(
  /<div class="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">/g,
  `<div class="md:overflow-visible overflow-x-auto rounded-xl border border-slate-200 shadow-sm pb-32 min-h-[300px]">`
);

// Replace ngClass logic
html = html.replace(
  /\[ngClass\]="\(i >= count - 2 && count > 3\) \? 'bottom-full mb-1' : 'top-full mt-1'"/g,
  `[ngClass]="(i > 0 && i >= count / 2) ? 'bottom-full mb-1' : 'top-full mt-1'"`
);

fs.writeFileSync(tsPath, html, 'utf8');
console.log('Fixed cotizaciones.html overflow');
