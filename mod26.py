# -*- coding: utf-8 -*-
import re

with open('src/app/features/gastos/gastos.component.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    'if (this.desde()) url += desde=&;',
    'if (this.desde()) url += `desde=${this.desde()}&`;'
)
text = text.replace(
    'if (this.hasta()) url += hasta=&;',
    'if (this.hasta()) url += `hasta=${this.hasta()}&`;'
)

with open('src/app/features/gastos/gastos.component.ts', 'w', encoding='utf-8') as f:
    f.write(text)
