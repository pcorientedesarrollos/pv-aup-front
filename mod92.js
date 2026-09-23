const fs = require('fs');
let html = fs.readFileSync('src/app/features/home/home.component.html', 'utf8');

html = html.replace(/resumen\(\)\?\.ventasSemana \| currency/g, "resumen()?.ventasSemanaTotal | currency");

fs.writeFileSync('src/app/features/home/home.component.html', html, 'utf8');
console.log('Fixed home.component.html');
