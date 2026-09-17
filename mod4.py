import re

with open('src/app/features/corte-caja/corte-caja.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

target = '</div>\n            </div>\n\n            <!-- Si el corte ya se hizo'

insertion = '''                  <button (click)="verDetalle(datosCorte())" class="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-lg transition-colors border border-slate-300 flex justify-center items-center gap-2">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    Ver Movimientos del Turno (Gastos, Compras, Ventas)
                  </button>
'''

text = text.replace(target, insertion + target)

with open('src/app/features/corte-caja/corte-caja.component.html', 'w', encoding='utf-8') as f:
    f.write(text)
