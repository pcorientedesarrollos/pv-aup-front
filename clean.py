import re

with open('src/app/features/dashboard/dashboard.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'\s*<div class="px-4 py-2"><p class="text-\[9px\] text-red-500 font-bold break-all">SESION COMPLETA:.*?</div>', '', text, flags=re.DOTALL)

with open('src/app/features/dashboard/dashboard.html', 'w', encoding='utf-8') as f:
    f.write(text)
