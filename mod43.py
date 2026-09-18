# -*- coding: utf-8 -*-
import os
import re

directory = 'src/app/features'

# We will just remove any <p> that has 'page-subtitle' class.
# And also specific other classes that we know act as subtitles directly after titles.
def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    original = text
    
    # Remove any <p class="page-subtitle">...</p>
    text = re.sub(r'<p[^>]*class="[^"]*page-subtitle[^"]*"[^>]*>.*?</p>', '', text, flags=re.DOTALL | re.IGNORECASE)
    
    # For others, let's find <h1 or <h2 and remove the very first <p> after it if it has 'text-slate-500' or 'text-gray-500'
    # We do this by searching for h1/h2, then looking ahead for a <p>.
    
    # Let's iterate all h1/h2 tags
    new_text = ""
    last_end = 0
    for match in re.finditer(r'<h[12][^>]*>.*?</h[12]>', text, flags=re.DOTALL | re.IGNORECASE):
        start = match.start()
        end = match.end()
        
        # Look for the next <p> tag
        p_match = re.search(r'\s*<p[^>]*class="[^"]*(text-slate-500|text-gray-500)[^"]*"[^>]*>.*?</p>', text[end:end+1500], flags=re.DOTALL | re.IGNORECASE)
        if p_match:
            # We must be careful! Is it the subtitle?
            # It usually contains things like "Gesti", "Control", "Personaliza"
            content = p_match.group(0).lower()
            if "gesti" in content or "control" in content or "personaliza" in content or "mueve productos" in content or "documentos sin" in content:
                print(f"Removing from {filepath}: {p_match.group(0).strip()[:50]}...")
                text = text[:end + p_match.start()] + text[end + p_match.end():]
                # Note: modifying text while iterating finditer is bad.
                # So let's just do it sequentially.
                break

    # Re-run for sequential replacement safely
    while True:
        m = re.search(r'(<h[12][^>]*>.*?</h[12]>(?:\s*<div[^>]*>.*?</div>)*)\s*<p[^>]*class="[^"]*(text-slate-500|text-gray-500|page-subtitle)[^"]*"[^>]*>(.*?)</p>', text, flags=re.DOTALL | re.IGNORECASE)
        if not m:
            break
        # Check if the content inside the p looks like a subtitle
        p_content = m.group(3).lower()
        if "este iva" in p_content or "rfc:" in p_content or "transacci" in p_content or "revisa la vista" in p_content or "busca el" in p_content or "aparecer" in p_content:
            # Skip these
            # To avoid infinite loop, we replace the <p> temporarily and then put it back? No, let's just replace it carefully
            text = text[:m.end(1)] + "\n<!-- skipped -->\n" + text[m.end(1):]
            break
        else:
            print(f"Removing subtitle: {p_content[:50]}")
            text = text[:m.end(1)] + text[m.end():]

    if text != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text.replace("\n<!-- skipped -->\n", ""))

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

