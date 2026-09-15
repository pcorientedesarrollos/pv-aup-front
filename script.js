const fs = require('fs');
let content = fs.readFileSync('src/app/features/productos/productos.component.html', 'utf8');
const replaceBlock = fs.readFileSync('replacement.html', 'utf8');

const regex = /<div class="flex gap-3 flex-wrap">[\s\S]*?Ganancia Proyectada[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/m;
content = content.replace(regex, replaceBlock);
fs.writeFileSync('src/app/features/productos/productos.component.html', content, 'utf8');
