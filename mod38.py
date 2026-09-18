# -*- coding: utf-8 -*-
with open('src/app/features/proveedores/proveedores.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
# Insert invisible label before the select
text = re.sub(r'(<select\s+\[ngModel\]="filtroEstado\(\)")', r'<label class="filter-label" style="opacity: 0;">&nbsp;</label>\n              \1', text)

with open('src/app/features/proveedores/proveedores.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
