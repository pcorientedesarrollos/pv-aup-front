const fs = require('fs');
let tsPath = 'src/app/features/historial/historial.component.html';
let html = fs.readFileSync(tsPath, 'utf8');

// The original is <div class="table-wrapper overflow-x-auto w-full pb-24 min-h-[300px]">
html = html.replace(
  /<div class="table-wrapper overflow-x-auto w-full pb-24 min-h-\[300px\]">/g,
  `<div class="table-wrapper md:overflow-visible overflow-x-auto w-full pb-32 min-h-[350px]">`
);

// Replace ngClass logic (it appears in the dropdown)
html = html.replace(
  /\[ngClass\]="\(i >= count - 2 && count > 3\) \? 'bottom-full mb-1' : 'top-full mt-1'"/g,
  `[ngClass]="(i > 0 && i >= count / 2) ? 'bottom-full mb-1' : 'top-full mt-1'"`
);

fs.writeFileSync(tsPath, html, 'utf8');
console.log('Fixed historial.component.html overflow');
