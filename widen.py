with open('src/app/features/productos/productos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('max-width:850px', 'max-width:950px')

with open('src/app/features/productos/productos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
