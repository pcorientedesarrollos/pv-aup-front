const fs = require('fs');
let text = fs.readFileSync('src/app/features/gastos/gastos.component.html', 'utf-8');
text = text.replace(/vi.*?ticos/g, 'viaticos');
fs.writeFileSync('src/app/features/gastos/gastos.component.html', text, 'utf-8');
