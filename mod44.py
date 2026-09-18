# -*- coding: utf-8 -*-
import os
import re

directory = 'src/app/features'

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    original = text
    
    # Remove specific subtitles that were missed
    
    # 1. Productos
    text = re.sub(r'<p class="text-sm text-slate-500 mt-0\.5">Gesti[^<]+</p>', '', text)
    
    # 2. Cotizaciones
    text = re.sub(r'<p class="page-subtitle">Gestiona las cotizaciones[^<]+</p>', '', text)
    
    # 3. Compras
    text = re.sub(r'<p class="page-subtitle">Control de mercanc[^<]+</p>', '', text)
    
    # 4. Proveedores
    # Wait, Proveedores just has `<h1 class="page-title"> Directorio de Proveedores </h1>`. No subtitle!
    
    # 5. Clientes
    # Clientes has `<h1 class="page-title"> Directorio de Clientes </h1>`. No subtitle!
    
    if text != original:
        print(f"Fixed missing subtitles in {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text)

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

