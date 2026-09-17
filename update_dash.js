const fs = require('fs');

let html = fs.readFileSync('src/app/features/dashboard/dashboard.html', 'utf8');

const replacements = [
  { search: '!matchSearch(\\'home Dashboard\\')', perm: 'menu_pos' }, // or something else, but wait: dashboard always available? let's make it always available
  { search: '!matchSearch(\\'pos\\')', perm: 'menu_pos' },
  { search: '!matchSearch(\\'historial Historial Ventas\\')', perm: 'menu_historial' },
  { search: '!matchSearch(\\'cotizaciones\\')', perm: 'menu_cotizaciones' },
  { search: '!matchSearch(\\'facturas Facturas CFDI\\')', perm: 'menu_facturas' },
  { search: '!matchSearch(\\'corte-caja Corte de Caja\\')', perm: 'menu_corte' },
  { search: '!matchSearch(\\'gastos Gastos\\')', perm: 'menu_gastos' },
  { search: '!matchSearch(\\'productos\\')', perm: 'menu_productos' },
  { search: '!matchSearch(\\'categorias Categorías\\')', perm: 'menu_categorias', needsClean: true },
  { search: '!matchSearch(\\'inventario\\')', perm: 'menu_kardex' },
  { search: '!matchSearch(\\'inventario/traspasos Traspasos\\')', perm: 'menu_traspasos', needsClean: true },
  { search: '!matchSearch(\\'produccion Producción\\')', perm: 'menu_produccion' },
  { search: '!matchSearch(\\'compras Compras\\')', perm: 'menu_compras', needsClean: true },
  { search: '!matchSearch(\\'proveedores Proveedores\\')', perm: 'menu_proveedores', needsClean: true },
  { search: '!matchSearch(\\'clientes Clientes\\')', perm: 'menu_clientes' },
  { search: '!matchSearch(\\'sucursales Sucursales\\')', perm: 'menu_sucursales', needsClean: true },
  { search: '!matchSearch(\\'devoluciones Devoluciones\\')', perm: 'menu_devoluciones' },
  { search: '!matchSearch(\\'usuarios Usuarios\\')', perm: 'menu_usuarios' },
  { search: '!matchSearch(\\'configurar ticket comprobante\\')', perm: 'menu_configuracion' },
  { search: '!matchSearch(\\'configuracion Config. de Empresa\\')', perm: 'menu_configuracion', needsClean: true }
];

// Instead of @if, we will ADD the permission check to the [hidden] attribute!
// E.g., [hidden]="!matchSearch('pos') || !auth.tienePermiso('menu_pos')"
// Wait, if we use [hidden], it still renders in the DOM but is hidden. This is perfectly fine and standard for Angular template!
// First we clean up the existing @if blocks around these menus!

html = html.replace(/@if\s*\(auth\.sesion\(\)\?.idPerfil\s*===\s*1\s*\|\|\s*auth\.sesion\(\)\?.idPerfil\s*===\s*3\)\s*\{/g, '<!-- @if removed -->');
html = html.replace(/@if\s*\(auth\.sesion\(\)\?.idPerfil\s*!==\s*2\)\s*\{/g, '<!-- @if removed -->');
// Now we have extra '}' everywhere that matched those @if blocks.
// I will manually remove them for the specific ones: Categorías, Traspasos, Compras, Proveedores, Sucursales, Configuración

// The easiest way is to add the check directly inside the [hidden] attribute!
// Let's replace the whole [hidden]="!matchSearch('xyz')" with [hidden]="!matchSearch('xyz') || !auth.tienePermiso('xyz')"
// Wait, I can't easily remove the } if I do it via regex without being careful.

