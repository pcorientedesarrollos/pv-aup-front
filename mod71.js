const fs = require('fs');

// 1. FIX DUPLICATE BUTTON IN CORTE-CAJA HTML
let html = fs.readFileSync('src/app/features/corte-caja/corte-caja.component.html', 'utf8');

// The duplicate block looks like:
// <button (click)="abrirReporteGastos()"...> ... </button>
// <button (click)="abrirReporteGastos()"...> ... </button>
const buttonRegex = /(<button \(click\)="abrirReporteGastos\(\)"[^>]*>[\s\S]*?<\/button>\s*){2,}/g;
html = html.replace(buttonRegex, (match) => {
  // Return just ONE instance
  const singleButton = match.match(/<button \(click\)="abrirReporteGastos\(\)"[^>]*>[\s\S]*?<\/button>/)[0];
  return singleButton + '\n      ';
});

fs.writeFileSync('src/app/features/corte-caja/corte-caja.component.html', html, 'utf8');
console.log('Fixed duplicate button in HTML.');

// 2. FIX CONSTANCIA PARSER IN BACKEND
let ts = fs.readFileSync('../pv-aup-back/src/pos/pos.service.ts', 'utf8');

// Replace the denominacion extraction logic
const oldDenominacionRegex = /let nombre = '';\s*const denominacionMatch = text\.match\(\/Registro Federal de Contribuyentes\\s\*\(\[\\s\\S\]\+\?\)\\s\*\(\?:Nombre, denominaci\[\^\/\]\+\/i\);\s*if \(denominacionMatch && denominacionMatch\[1\]\) \{\s*\/\/ Reemplazar saltos de l.*?nea por espacios para unir nombres separados en varias l.*?neas\s*nombre = denominacionMatch\[1\]\.replace\(\/\[\\r\\n\]\+\/g, ' '\)\.trim\(\);\s*\}/s;

// We will just replace it with a more robust logic
let newNameLogic = `
      let nombre = '';
      
      // Intentar Persona Moral
      const denominacionMatch = text.match(/(?:Nombre, denominaci(?:ó|o|.)n o raz(?:ó|o|.)n social:|Denominaci(?:ó|o|.)n\\/Raz(?:ó|o|.)n Social:)\\s*([^\\n]+)/i);
      if (denominacionMatch && denominacionMatch[1]) {
        nombre = denominacionMatch[1].trim();
      }

      // Intentar Persona Física (Nombre(s), Primer Apellido, Segundo Apellido)
      if (!nombre || nombre.includes("RFC") || nombre.length < 3) {
         nombre = '';
         const nMatch = text.match(/Nombre\\s*\\(s\\):\\s*([^\\n]+)/i);
         if (nMatch && nMatch[1]) nombre += nMatch[1].trim();
         
         const a1Match = text.match(/Primer Apellido:\\s*([^\\n]+)/i);
         if (a1Match && a1Match[1]) nombre += ' ' + a1Match[1].trim();
         
         const a2Match = text.match(/Segundo Apellido:\\s*([^\\n]+)/i);
         if (a2Match && a2Match[1]) nombre += ' ' + a2Match[1].trim();
         
         nombre = nombre.trim();
      }
      
      // Fallback si an as captur basura
      if (nombre.includes("Registro Federal") || !nombre) {
         nombre = ''; // dejar vaco para que el usuario lo llene
      }
`;

// It's safer to just replace from "let nombre = '';" to "const regimenCapitalMatch"
let parseCsfText = ts.substring(ts.indexOf('async parseCsf('), ts.indexOf('let regimenFiscal = \'\';', ts.indexOf('async parseCsf(')));

let startNombre = parseCsfText.indexOf('let nombre = \'\';');
let endNombre = parseCsfText.indexOf('// Extraer R');

if (startNombre !== -1 && endNombre !== -1) {
  let toReplace = parseCsfText.substring(startNombre, endNombre);
  ts = ts.replace(toReplace, newNameLogic + '\n\n        ');
  fs.writeFileSync('../pv-aup-back/src/pos/pos.service.ts', ts, 'utf8');
  console.log('Fixed Constancia parser in TS.');
} else {
  console.log('Could not find constancia name logic block.');
}
