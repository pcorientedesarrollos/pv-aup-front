const fs = require('fs');
let text = fs.readFileSync('src/app/features/proveedores/proveedores.component.html', 'utf-8');

const target = `<div class="filters-row">
          <div class="filter-control w-full md:max-w-xs relative">`;

const replacement = `<div class="filters-row flex flex-col md:flex-row gap-4 items-end">
          <div class="filter-control w-full md:w-64 relative">`;

text = text.replace(target, replacement);

fs.writeFileSync('src/app/features/proveedores/proveedores.component.html', text, 'utf-8');
