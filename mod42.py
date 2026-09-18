# -*- coding: utf-8 -*-
import os
import re

directory = 'src/app/features'

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Find <h1 ...> ... </h1>
    h1_match = re.search(r'<h1[^>]*>.*?</h1>', text, flags=re.DOTALL | re.IGNORECASE)
    if not h1_match:
        return

    # Look for the next <p> tag within a reasonable distance (e.g., 500 characters)
    start_search = h1_match.end()
    p_match = re.search(r'<p[^>]*class="[^"]*(page-subtitle|text-slate-500|text-gray-500)[^"]*"[^>]*>.*?</p>', text[start_search:start_search+1000], flags=re.DOTALL | re.IGNORECASE)
    
    if p_match:
        # Check if it looks like the subtitle
        print(f"Removing subtitle from {filepath}: {p_match.group(0).strip()[:50]}...")
        new_text = text[:start_search + p_match.start()] + text[start_search + p_match.end():]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_text)

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

