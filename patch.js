const fs = require('fs');
let text = fs.readFileSync('src/app/features/dashboard/dashboard.html', 'utf-8');
text = text.replace(
  '</nav>',
  '  <div class="px-4 py-2"><p class="text-[9px] text-red-500 font-bold break-all">PERMISOS FRONT: {{ auth.sesion()?.permisos | json }}</p></div>\n        </nav>'
);
fs.writeFileSync('src/app/features/dashboard/dashboard.html', text, 'utf-8');
console.log('Patched');
