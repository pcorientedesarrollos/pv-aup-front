const fs = require('fs');
let text = fs.readFileSync('src/app/features/productos/productos.component.html', 'utf-8');

const startIdx = text.indexOf('<!-- Resumen de Inventario -->');
const endIdx = text.indexOf('@if (isSoporte()) {');

if (startIdx !== -1 && endIdx !== -1) {
    let block = text.substring(startIdx, endIdx);
    text = text.substring(0, startIdx) + text.substring(endIdx);
    
    block = block.replace('ml-auto ', '');
    
    const filterStart = text.indexOf('<div class="flex gap-3 flex-wrap">');
    const filterEnd = text.indexOf('</div>\n  </div>', filterStart);
    
    if (filterStart !== -1 && filterEnd !== -1) {
        let content = text.substring(filterStart + '<div class="flex gap-3 flex-wrap">'.length, filterEnd);
        const replacement = '<div class="flex flex-col gap-3 items-end">\n' + block + '      <div class="flex gap-3 flex-wrap justify-end">' + content + '</div>\n  </div>\n  </div>';
        
        text = text.substring(0, filterStart) + replacement + text.substring(filterEnd + '</div>\n  </div>'.length);
        fs.writeFileSync('src/app/features/productos/productos.component.html', text, 'utf-8');
    }
}
