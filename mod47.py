# -*- coding: utf-8 -*-
import os
import re

for root, _, files in os.walk('src/app/features'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                text = f.read()
            
            # Find all <h1/2> tags
            for match in re.finditer(r'<h[12][^>]*>(.*?)</h[12]>', text, flags=re.DOTALL):
                start = match.start()
                end = match.end()
                
                # Check for <p> directly following
                p_match = re.search(r'^\s*(?:<div[^>]*>.*?</div>\s*)*<p[^>]*class="[^"]*(text-slate-500|text-gray-500|page-subtitle)[^"]*"[^>]*>(.*?)</p>', text[end:end+500], flags=re.DOTALL | re.IGNORECASE)
                if p_match:
                    content = p_match.group(2).strip()
                    if len(content) > 10 and not "<svg" in content and not "Este IVA" in content and not "Aparecer" in content and not "RFC:" in content:
                        print(f"FOUND IN {filepath}:\nTITLE: {match.group(1).strip()[:50]}\nSUBTITLE: {content[:100]}\n")
