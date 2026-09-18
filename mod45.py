# -*- coding: utf-8 -*-
import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    original = text
    text = re.sub(r'<p class="page-subtitle">[^<]+</p>', '', text)
    
    if text != original:
        print(f"Fixed subtitles in {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text)

for root, _, files in os.walk('src/app/features'):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

