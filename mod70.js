const fs = require('fs');

let html = fs.readFileSync('src/app/features/corte-caja/corte-caja.component.html', 'utf8');

const reportesBtnHtml = `
      <button (click)="cargarCorte()" class="btn-cancel">
        Recalcular
      </button>
      <button (click)="abrirReporteGastos()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold shadow transition-colors flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        Reporte de Gastos
      </button>`;

if (!html.includes('Reporte de Gastos')) {
  html = html.replace('<button (click)="cargarCorte()" class="btn-cancel">\r\n        Recalcular\r\n      </button>', reportesBtnHtml);
  html = html.replace('<button (click)="cargarCorte()" class="btn-cancel">\n        Recalcular\n      </button>', reportesBtnHtml);
}

const modalHtml = `
<!-- Modal Reporte de Gastos Global -->
@if (mostrarReporteGastos()) {
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" (click)="cerrarReporteGastos()"></div>
    <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Cabecera del Modal -->
      <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-indigo-50">
        <h3 class="text-xl font-bold text-indigo-900 flex items-center gap-2">
          <svg class="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          Reporte Global de Gastos
        </h3>
        <button (click)="cerrarReporteGastos()" class="text-slate-400 hover:text-slate-600">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Contenido / Filtros -->
      <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        <!-- Sidebar de Filtros -->
        <div class="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col gap-4 overflow-y-auto">
          <h4 class="font-bold text-slate-700 text-sm uppercase tracking-wider">Períodos Rápidos</h4>
          
          <div class="flex flex-col gap-2">
            <button (click)="seleccionarPeriodo('hoy')" [class.bg-indigo-100]="periodoSeleccionado() === 'hoy'" [class.text-indigo-800]="periodoSeleccionado() === 'hoy'" class="text-left px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-200 transition-colors">
              Hoy
            </button>
            <button (click)="seleccionarPeriodo('semana')" [class.bg-indigo-100]="periodoSeleccionado() === 'semana'" [class.text-indigo-800]="periodoSeleccionado() === 'semana'" class="text-left px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-200 transition-colors">
              Esta Semana
            </button>
            <button (click)="seleccionarPeriodo('mes')" [class.bg-indigo-100]="periodoSeleccionado() === 'mes'" [class.text-indigo-800]="periodoSeleccionado() === 'mes'" class="text-left px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-200 transition-colors">
              Este Mes
            </button>
            <button (click)="seleccionarPeriodo('personalizado')" [class.bg-indigo-100]="periodoSeleccionado() === 'personalizado'" [class.text-indigo-800]="periodoSeleccionado() === 'personalizado'" class="text-left px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-200 transition-colors">
              Rango Personalizado
            </button>
          </div>

          @if (periodoSeleccionado() === 'personalizado') {
            <div class="mt-4 space-y-3 p-3 bg-white border border-slate-200 rounded-lg">
              <div>
                <label class="block text-xs font-semibold text-slate-500 mb-1">Desde:</label>
                <input type="date" [ngModel]="fechaDesde()" (ngModelChange)="fechaDesde.set($event)" class="w-full text-sm p-2 border border-slate-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-500 mb-1">Hasta:</label>
                <input type="date" [ngModel]="fechaHasta()" (ngModelChange)="fechaHasta.set($event)" class="w-full text-sm p-2 border border-slate-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
              </div>
              <button (click)="cargarGastosReporte()" class="w-full bg-indigo-600 text-white text-sm font-bold py-2 rounded hover:bg-indigo-700 transition">Buscar Rango</button>
            </div>
          }
        </div>

        <!-- Área Principal / Resultados -->
        <div class="flex-1 p-6 overflow-y-auto bg-slate-100 flex flex-col relative">
          
          @if (cargandoReporte()) {
            <div class="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
            </div>
          }

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Tarjeta Total -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center">
              <span class="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wide">Total de Gastos del Período</span>
              <span class="text-4xl font-black text-red-600">{{ totalGastosReporte() | currency:'MXN' }}</span>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center items-start">
              <span class="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wide">Gastos Registrados</span>
              <span class="text-3xl font-bold text-slate-800">{{ gastosReporte().length }} <span class="text-lg text-slate-500 font-normal">movimientos</span></span>
            </div>
          </div>

          <!-- Tabla de Desglose -->
          <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col">
            <div class="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h4 class="font-bold text-slate-700">Desglose de Movimientos</h4>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm whitespace-nowrap">
                <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th class="px-6 py-3">Fecha y Hora</th>
                    <th class="px-6 py-3">Categoría</th>
                    <th class="px-6 py-3">Concepto / Descripción</th>
                    <th class="px-6 py-3">Registrado por</th>
                    <th class="px-6 py-3 text-right">Monto</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  @if (gastosReporte().length === 0) {
                    <tr>
                      <td colspan="5" class="px-6 py-12 text-center text-slate-400">
                        No se encontraron gastos en este período.
                      </td>
                    </tr>
                  }
                  @for (gasto of gastosReporte(); track gasto.idGasto) {
                    <tr class="hover:bg-slate-50 transition-colors">
                      <td class="px-6 py-3 text-slate-600">{{ gasto.fecha | date:'dd/MM/yyyy HH:mm' }}</td>
                      <td class="px-6 py-3">
                        <span class="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium border border-slate-200">
                          {{ gasto.categoria?.nombre || 'General' }}
                        </span>
                      </td>
                      <td class="px-6 py-3 text-slate-800 font-medium">{{ gasto.concepto }}</td>
                      <td class="px-6 py-3 text-slate-600 text-xs">{{ gasto.usuario?.nombre || 'Sistema' }}</td>
                      <td class="px-6 py-3 text-right font-bold text-red-600">-{{ gasto.monto | currency:'MXN' }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
}
`;

if (!html.includes('Modal Reporte de Gastos Global')) {
  html = html + '\n' + modalHtml;
}

fs.writeFileSync('src/app/features/corte-caja/corte-caja.component.html', html, 'utf8');
console.log('HTML updated');
