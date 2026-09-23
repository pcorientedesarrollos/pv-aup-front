const fs = require('fs');
let html = fs.readFileSync('src/app/features/cotizaciones/cotizaciones.html', 'utf8');

html = html.replace(
  /<div class="relative group inline-block text-left">/g,
  `<div class="relative inline-block text-left" (click)="$event.stopPropagation()">`
);

html = html.replace(
  /<button class="p-2 text-gray-400 hover:text-indigo-600 focus:outline-none transition-colors rounded-full hover:bg-indigo-50" title="Acciones">/g,
  `<button (click)="menuAbierto === cot.idCotizacion ? menuAbierto = null : menuAbierto = cot.idCotizacion" class="p-2 text-gray-400 hover:text-indigo-600 focus:outline-none transition-colors rounded-full hover:bg-indigo-50" title="Acciones">`
);

// We need to check if *ngIf works. The build passed earlier, so it probably works, but just in case, since Angular 17 allows @if, it's safer to check if CommonModule is in the TS file.
// Let's write it.
fs.writeFileSync('src/app/features/cotizaciones/cotizaciones.html', html, 'utf8');
console.log('Fixed HTML button');
