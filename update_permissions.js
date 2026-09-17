const fs = require('fs');

// Update usuarios.component.ts
let tsContent = fs.readFileSync('src/app/features/usuarios/usuarios.component.ts', 'utf8');
const newPermisos = permisosDisponibles = [
    // Acciones específicas
    { id: 'crear_producto', nombre: 'Crear Productos' },
    { id: 'editar_producto', nombre: 'Editar Productos' },
    { id: 'eliminar_producto', nombre: 'Eliminar Productos' },
    { id: 'ver_reportes', nombre: 'Ver Reportes' },
    { id: 'cancelar_venta', nombre: 'Cancelar Ventas' },
    { id: 'facturar', nombre: 'Facturar Ventas' },
    { id: 'aplicar_descuentos', nombre: 'Aplicar Descuentos' },
    
    // Módulos de Navegación
    { id: 'menu_pos', nombre: 'Acceso: Punto de Venta' },
    { id: 'menu_historial', nombre: 'Acceso: Historial Ventas' },
    { id: 'menu_cotizaciones', nombre: 'Acceso: Cotizaciones' },
    { id: 'menu_facturas', nombre: 'Acceso: Facturas' },
    { id: 'menu_corte', nombre: 'Acceso: Corte de Caja' },
    { id: 'menu_gastos', nombre: 'Acceso: Gastos' },
    { id: 'menu_productos', nombre: 'Acceso: Productos' },
    { id: 'menu_categorias', nombre: 'Acceso: Categorías' },
    { id: 'menu_kardex', nombre: 'Acceso: Kardex' },
    { id: 'menu_traspasos', nombre: 'Acceso: Traspasos' },
    { id: 'menu_produccion', nombre: 'Acceso: Producción' },
    { id: 'menu_compras', nombre: 'Acceso: Compras' },
    { id: 'menu_proveedores', nombre: 'Acceso: Proveedores' },
    { id: 'menu_clientes', nombre: 'Acceso: Clientes' },
    { id: 'menu_sucursales', nombre: 'Acceso: Sucursales' },
    { id: 'menu_devoluciones', nombre: 'Acceso: Devoluciones' },
    { id: 'menu_usuarios', nombre: 'Acceso: Usuarios' },
    { id: 'menu_configuracion', nombre: 'Acceso: Configuración' }
  ];;

tsContent = tsContent.replace(/permisosDisponibles\s*=\s*\[[\s\S]*?\];/, newPermisos);
fs.writeFileSync('src/app/features/usuarios/usuarios.component.ts', tsContent, 'utf8');

console.log("Updated usuarios.component.ts");
