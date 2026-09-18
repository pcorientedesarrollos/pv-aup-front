# -*- coding: utf-8 -*-
with open('src/app/features/gastos/gastos.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
text = re.sub(r'vi.*?ticos', 'viáticos', text)

with open('src/app/features/gastos/gastos.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
