const fs = require('fs');
let text = fs.readFileSync('src/app/features/compras/nueva-compra.component.html', 'utf-8');
text = text.replace('routerLink="/productos" [queryParams]="{ modal: \'nuevo\' }"', 'href="/productos?modal=nuevo"');
fs.writeFileSync('src/app/features/compras/nueva-compra.component.html', text, 'utf-8');
