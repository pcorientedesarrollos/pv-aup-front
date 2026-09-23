const fs = require('fs');
let html = fs.readFileSync('src/app/features/historial/historial.component.html', 'utf8');

// 1. Remove 'group' from the relative wrapper and add stopPropagation
html = html.replace(
  /<div class="relative group inline-block text-left">/g,
  `<div class="relative inline-block text-left" (click)="$event.stopPropagation()">`
);

// 2. Add (click) event to the button
html = html.replace(
  /<button class="p-2 text-gray-400 hover:text-indigo-600 focus:outline-none transition-colors rounded-full hover:bg-indigo-50" title="Acciones">/g,
  `<button (click)="menuAbierto === venta.idVenta ? menuAbierto = null : menuAbierto = venta.idVenta" class="p-2 text-gray-400 hover:text-indigo-600 focus:outline-none transition-colors rounded-full hover:bg-indigo-50" title="Acciones">`
);

// 3. Update the dropdown container to use *ngIf and remove group-hover classes
html = html.replace(
  /<div class="absolute right-0 w-56 bg-white border border-gray-200 divide-y divide-slate-100 rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-\[60\] top-full mt-1">/g,
  `<div class="absolute right-0 w-56 bg-white border border-gray-200 divide-y divide-slate-100 rounded-md shadow-2xl z-[60] top-full mt-1" *ngIf="menuAbierto === venta.idVenta">`
);

fs.writeFileSync('src/app/features/historial/historial.component.html', html, 'utf8');
console.log('Fixed historial dropdown');
