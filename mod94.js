const fs = require('fs');
let html = fs.readFileSync('src/app/features/pos/apertura-caja/apertura-caja.component.html', 'utf8');

let formBlock = `<!-- Monto -->
          <div class="space-y-2">`;

let blockReplacement = `@if (turnoAntiguoAbierto) {
            <div class="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-6 text-center shadow-sm">
              <span class="text-4xl block mb-2">🛑</span>
              <h3 class="font-bold text-lg mb-1">Turno Anterior Abierto</h3>
              <p class="text-sm">Tienes un turno abierto del día <strong>{{ fechaTurnoAntiguo }}</strong>.</p>
              <p class="text-sm mt-2 font-medium">Por favor, realiza el corte de caja físico de ese día antes de registrar nuevas ventas hoy.</p>
            </div>
            <button
              (click)="irACorteDeCaja()"
              class="w-full py-4 bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:bg-slate-900 active:scale-95 transition-all text-base mt-2"
            >
              Ir a Corte de Caja
            </button>
          } @else {
          <!-- Monto -->
          <div class="space-y-2">`;

html = html.replace(formBlock, blockReplacement);

let endFormBlock = `<!-- Botón -->`;
let endReplacement = `}
          
          <!-- Botón -->`;
          
html = html.replace(endFormBlock, endReplacement);

fs.writeFileSync('src/app/features/pos/apertura-caja/apertura-caja.component.html', html, 'utf8');
console.log('Fixed HTML');
