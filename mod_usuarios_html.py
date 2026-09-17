import sys

with open('src/app/features/usuarios/usuarios.component.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('grid-cols-1 gap-2', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3')

with open('src/app/features/usuarios/usuarios.component.html', 'w', encoding='utf-8') as f:
    f.write(content)
