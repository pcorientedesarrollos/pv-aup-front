const fs = require('fs');
let text = fs.readFileSync('src/app/features/proveedores/proveedores.component.html', 'utf-8');

const target = `<div class="filter-control w-full md:max-w-xs relative">
              <select`;

const replacement = `<div class="filter-control w-full md:max-w-xs relative">
              <label class="filter-label" style="opacity: 0;">&nbsp;</label>
              <select`;

text = text.replace(target, replacement);
fs.writeFileSync('src/app/features/proveedores/proveedores.component.html', text, 'utf-8');
