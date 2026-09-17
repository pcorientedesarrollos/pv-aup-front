import codecs

def safe_replace(filepath, replacements):
    with codecs.open(filepath, 'r', 'utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
        else:
            print(f'Could not find match in {filepath}')
            
    with codecs.open(filepath, 'w', 'utf-8') as f:
        f.write(content)

# 1. inventario.html
safe_replace('src/app/features/inventario/inventario.html', [
    ('<div class="modal-container w-full sm:w-auto mx-4 sm:mx-auto max-w-lg">\r\n        <div class="modal-header">\r\n          <h2 class="modal-title">Detalles del Movimiento</h2>',
     '<div class="modal-container w-full sm:w-auto mx-4 sm:mx-auto max-w-3xl">\r\n        <div class="modal-header">\r\n          <h2 class="modal-title">Detalles del Movimiento</h2>'),
    ('<div class="modal-container w-full sm:w-auto mx-4 sm:mx-auto max-w-lg">\n        <div class="modal-header">\n          <h2 class="modal-title">Detalles del Movimiento</h2>',
     '<div class="modal-container w-full sm:w-auto mx-4 sm:mx-auto max-w-3xl">\n        <div class="modal-header">\n          <h2 class="modal-title">Detalles del Movimiento</h2>')
])

# 2. productos.component.html
safe_replace('src/app/features/productos/productos.component.html', [
    ('||| {{ prod.codigoBarras }}', '- {{ prod.codigoBarras }}')
])

# 3. historial.component.html
old_hist = '''<!-- Tarjetas de resumen -->
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
    <article class="metric-card">
      <div class="flex flex-col">
        <span class="text-sm font-medium text-gray-500">Total Ventas</span>
        <span class="text-3xl font-bold text-gray-800 mt-1">{{ ventasFiltradas().length }}</span>
      </div>
    </article>
    <article class="metric-card">
      <div class="flex flex-col">
        <span class="text-sm font-medium text-gray-500">Completadas</span>
        <span class="text-3xl font-bold text-green-600 mt-1">{{ ventasCompletadas() }}</span>
      </div>
    </article>
    <article class="metric-card hidden md:flex">
      <div class="flex flex-col">
        <span class="text-sm font-medium text-gray-500">Canceladas</span>
        <span class="text-3xl font-bold text-red-600 mt-1">{{ ventasCanceladas() }}</span>
      </div>
    </article>
  </div>'''

new_hist = '''<!-- Tarjetas de resumen -->
  <div class="flex flex-wrap items-center justify-end gap-8 mb-6">
    <div class="flex flex-col text-right">
      <span class="text-sm font-medium text-slate-500">Total Ventas</span>
      <span class="text-3xl font-bold text-slate-800">{{ ventasFiltradas().length }}</span>
    </div>
    <div class="flex flex-col text-right">
      <span class="text-sm font-medium text-slate-500">Completadas</span>
      <span class="text-3xl font-bold text-emerald-600">{{ ventasCompletadas() }}</span>
    </div>
    <div class="flex flex-col text-right hidden md:flex">
      <span class="text-sm font-medium text-slate-500">Canceladas</span>
      <span class="text-3xl font-bold text-rose-600">{{ ventasCanceladas() }}</span>
    </div>
  </div>'''

safe_replace('src/app/features/historial/historial.component.html', [
    (old_hist.replace('\n', '\r\n'), new_hist.replace('\n', '\r\n')),
    (old_hist, new_hist)
])

print('Done.')
