import sys

with open('src/app/features/dashboard/dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# 1. Remove the @if blocks for idPerfil
content = re.sub(r'@if \(auth\.sesion\(\)\?\.idPerfil === 1 \|\| auth\.sesion\(\)\?\.idPerfil === 3\) \{', '', content)
content = re.sub(r'@if \(auth\.sesion\(\)\?\.idPerfil !== 2\) \{', '', content)

# 2. Add auth.tienePermiso(...) to the buttons
mappings = [
    ('!matchSearch(\'pos\')', 'menu_pos'),
    ('!matchSearch(\'historial Historial Ventas\')', 'menu_historial'),
    ('!matchSearch(\'cotizaciones\')', 'menu_cotizaciones'),
    ('!matchSearch(\'facturas Facturas CFDI\')', 'menu_facturas'),
    ('!matchSearch(\'corte-caja Corte de Caja\')', 'menu_corte'),
    ('!matchSearch(\'gastos Gastos\')', 'menu_gastos'),
    ('!matchSearch(\'productos\')', 'menu_productos'),
    ('!matchSearch(\'categorias Categorías\')', 'menu_categorias'),
    ('!matchSearch(\'inventario\')', 'menu_kardex'),
    ('!matchSearch(\'inventario/traspasos Traspasos\')', 'menu_traspasos'),
    ('!matchSearch(\'produccion Producción\')', 'menu_produccion'),
    ('!matchSearch(\'compras Compras\')', 'menu_compras'),
    ('!matchSearch(\'proveedores Proveedores\')', 'menu_proveedores'),
    ('!matchSearch(\'clientes Clientes\')', 'menu_clientes'),
    ('!matchSearch(\'sucursales Sucursales\')', 'menu_sucursales'),
    ('!matchSearch(\'devoluciones Devoluciones\')', 'menu_devoluciones'),
    ('!matchSearch(\'usuarios Usuarios\')', 'menu_usuarios'),
    ('!matchSearch(\'configurar ticket comprobante\')', 'menu_configuracion'),
    ('!matchSearch(\'configuracion Config. de Empresa\')', 'menu_configuracion')
]

for search, perm in mappings:
    # Look for: [hidden]="search"
    # Replace with: [hidden]="search || !auth.tienePermiso('perm')"
    # Note: we need to handle special characters carefully
    # The actual HTML has: [hidden]="!matchSearch('categorias Categorías')"
    # Or encoded versions? Let's try matching the inner content.
    
    # We will use re.sub with exact matching of the hidden attribute
    pattern = r'\[hidden\]="' + re.escape(search) + r'"'
    replacement = f'[hidden]="{search} || !auth.tienePermiso(\'{perm}\')"'
    content = re.sub(pattern, replacement, content)

# 3. Clean up dangling '}' that belonged to the @if blocks.
# This is tricky, but we know exactly where they were because we removed the opening tags.
# Actually, the buttons were wrapped like:
# <button ...>
# ...
# </button>
# }
# So we can search for </button>\s*} and replace with </button>
content = re.sub(r'</button>\s*\}', '</button>', content)

with open('src/app/features/dashboard/dashboard.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML modified successfully.")
