const fs = require('fs');
let html = fs.readFileSync('src/app/features/dashboard/dashboard.html', 'utf8');

// 1. Replace existing @if conditions that we know about
html = html.replace(/@if\s*\(auth\.sesion\(\)\?.idPerfil\s*===\s*1\s*\|\|\s*auth\.sesion\(\)\?.idPerfil\s*===\s*3\)\s*\{([\s\S]*?)matchSearch\('categorias Categor/g, "@if (auth.tienePermiso('menu_categorias')) {('categorias Categor");
html = html.replace(/@if\s*\(auth\.sesion\(\)\?.idPerfil\s*===\s*1\s*\|\|\s*auth\.sesion\(\)\?.idPerfil\s*===\s*3\)\s*\{([\s\S]*?)matchSearch\('inventario\/traspasos Traspasos/g, "@if (auth.tienePermiso('menu_traspasos')) {('inventario/traspasos Traspasos");
html = html.replace(/@if\s*\(auth\.sesion\(\)\?.idPerfil\s*!==\s*2\)\s*\{([\s\S]*?)matchSearch\('compras Compras/g, "@if (auth.tienePermiso('menu_compras')) {('compras Compras");
html = html.replace(/@if\s*\(auth\.sesion\(\)\?.idPerfil\s*===\s*1\s*\|\|\s*auth\.sesion\(\)\?.idPerfil\s*===\s*3\)\s*\{([\s\S]*?)matchSearch\('proveedores Proveedores/g, "@if (auth.tienePermiso('menu_proveedores')) {('proveedores Proveedores");
html = html.replace(/@if\s*\(auth\.sesion\(\)\?.idPerfil\s*===\s*1\s*\|\|\s*auth\.sesion\(\)\?.idPerfil\s*===\s*3\)\s*\{([\s\S]*?)matchSearch\('sucursales Sucursales/g, "@if (auth.tienePermiso('menu_sucursales')) {('sucursales Sucursales");
html = html.replace(/@if\s*\(auth\.sesion\(\)\?.idPerfil\s*===\s*1\s*\|\|\s*auth\.sesion\(\)\?.idPerfil\s*===\s*3\)\s*\{([\s\S]*?)matchSearch\('configuracion Config/g, "@if (auth.tienePermiso('menu_configuracion')) {('configuracion Config");

// Also for configurar ticket, there is NO @if block currently? Wait, let's look at the html
// Wait, Configurar ticket has NO @if block! Let's wrap it instead.

// 2. For items that DON'T have @if yet, we wrap them.
function wrapButton(html, matchStr, perm) {
  const regex = new RegExp("(<button \\\\[hidden\\\\]=\"!matchSearch\\\\('" + matchStr + "'\\\\)\"[\\\\s\\\\S]*?<\\\\/button>)", 'g');
  return html.replace(regex, "@if (auth.tienePermiso('" + perm + "')) {\n        \n        }");
}

html = wrapButton(html, 'pos', 'menu_pos');
html = wrapButton(html, 'historial Historial Ventas', 'menu_historial');
html = wrapButton(html, 'cotizaciones', 'menu_cotizaciones');
html = wrapButton(html, 'facturas Facturas CFDI', 'menu_facturas');
html = wrapButton(html, 'corte-caja Corte de Caja', 'menu_corte');
html = wrapButton(html, 'gastos Gastos', 'menu_gastos');
html = wrapButton(html, 'productos', 'menu_productos');
html = wrapButton(html, 'inventario', 'menu_kardex');
html = wrapButton(html, 'produccion Producci.n', 'menu_produccion');
html = wrapButton(html, 'clientes Clientes', 'menu_clientes');
html = wrapButton(html, 'devoluciones Devoluciones', 'menu_devoluciones');
html = wrapButton(html, 'usuarios Usuarios', 'menu_usuarios');
html = wrapButton(html, 'configurar ticket comprobante', 'menu_configuracion');

fs.writeFileSync('src/app/features/dashboard/dashboard.html', html, 'utf8');
console.log('Modified dashboard.html');
