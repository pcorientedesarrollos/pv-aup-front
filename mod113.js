const fs = require('fs');

function fixHtml(file) {
  let html = fs.readFileSync(file, 'utf8');

  // Change pb-32 to pb-64 and min-h-[350px] to min-h-[400px]
  html = html.replace(/pb-32/g, 'pb-64');
  html = html.replace(/min-h-\[300px\]/g, 'min-h-[400px]');
  html = html.replace(/min-h-\[350px\]/g, 'min-h-[400px]');
  
  // Remove the dynamic ngClass that makes it go upwards, just hardcode 'top-full mt-1'
  html = html.replace(
    /\[ngClass\]="[^"]+"/g,
    `class="$&"` // Wait, if I replace [ngClass]="...", I should replace it with the static classes, but they are already in the class string?
  );
  
  fs.writeFileSync(file, html, 'utf8');
}

// Wait, I need to be careful replacing [ngClass]. 
