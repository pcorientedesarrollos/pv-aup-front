const fs = require('fs');

let html = fs.readFileSync('src/app/features/dashboard/dashboard.html', 'utf8');

// First, remove existing @if blocks for idPerfil to avoid nesting confusion
html = html.replace(/@if\s*\(auth\.sesion\(\)\?.idPerfil\s*===\s*1\s*\|\|\s*auth\.sesion\(\)\?.idPerfil\s*===\s*3\)\s*\{/g, '');
html = html.replace(/@if\s*\(auth\.sesion\(\)\?.idPerfil\s*!==\s*2\)\s*\{/g, '');

// Since we removed the opening brackets of those @if, we need to remove their closing brackets.
// This is tricky with regex, so let's just do a manual replacement by looking for specific buttons and replacing them entirely, or just relying on [hidden]="!matchSearch(...) || !auth.tienePermiso(...)".
// Wait, actually, adding || !auth.tienePermiso(...) to the [hidden] attribute is the SAFEST way because we don't mess up Angular blocks!
// BUT if it's hidden, it still renders in DOM. That's fine.

// Let's modify the buttons by finding the matchSearch string and adding the auth.tienePermiso inside the template or wrapping it.
// Actually, it's better to just write a simple script that matches matchSearch('xyz') and if it matches, replaces the line.
