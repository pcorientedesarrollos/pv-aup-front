const fs = require('fs');
let ts = fs.readFileSync('src/app/features/corte-caja/corte-caja.component.ts', 'utf8');

const tsToAdd = `
  // --- REPORTE DE GASTOS ---
  mostrarReporteGastos = signal(false);
  periodoSeleccionado = signal<'hoy' | 'semana' | 'mes' | 'personalizado'>('hoy');
  fechaDesde = signal<string>('');
  fechaHasta = signal<string>('');
  gastosReporte = signal<any[]>([]);
  totalGastosReporte = computed(() => this.gastosReporte().reduce((sum, g) => sum + Number(g.monto || 0), 0));
  cargandoReporte = signal(false);

  obtenerFechaLocal(date: Date): string {
    const tzoffset = date.getTimezoneOffset() * 60000;
    return (new Date(date.getTime() - tzoffset)).toISOString().split('T')[0];
  }

  abrirReporteGastos() {
    this.mostrarReporteGastos.set(true);
    this.seleccionarPeriodo('hoy');
  }

  cerrarReporteGastos() {
    this.mostrarReporteGastos.set(false);
  }

  seleccionarPeriodo(periodo: 'hoy' | 'semana' | 'mes' | 'personalizado') {
    this.periodoSeleccionado.set(periodo);
    const hoy = new Date();
    
    if (periodo === 'hoy') {
      this.fechaDesde.set(this.obtenerFechaLocal(hoy));
      this.fechaHasta.set(this.obtenerFechaLocal(hoy));
      this.cargarGastosReporte();
    } else if (periodo === 'semana') {
      const primerDia = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 1));
      const ultimoDia = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 7));
      this.fechaDesde.set(this.obtenerFechaLocal(primerDia));
      this.fechaHasta.set(this.obtenerFechaLocal(ultimoDia));
      this.cargarGastosReporte();
    } else if (periodo === 'mes') {
      // hoy could have been mutated by the 'semana' block, so instantiate again
      const today = new Date();
      const primerDia = new Date(today.getFullYear(), today.getMonth(), 1);
      const ultimoDia = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      this.fechaDesde.set(this.obtenerFechaLocal(primerDia));
      this.fechaHasta.set(this.obtenerFechaLocal(ultimoDia));
      this.cargarGastosReporte();
    }
  }

  cargarGastosReporte() {
    this.cargandoReporte.set(true);
    let url = \`\${environment.apiUrl}/pos/gastos\`;
    const params = [];
    if (this.fechaDesde()) params.push(\`desde=\${this.fechaDesde()}\`);
    if (this.fechaHasta()) params.push(\`hasta=\${this.fechaHasta()}\`);
    if (params.length > 0) url += \`?\${params.join('&')}\`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.gastosReporte.set(data);
        this.cargandoReporte.set(false);
      },
      error: (err) => {
        console.error('Error al cargar reporte de gastos', err);
        this.cargandoReporte.set(false);
      }
    });
  }
`;

if (!ts.includes('mostrarReporteGastos')) {
  ts = ts.replace('cargarCorte() {', tsToAdd + '\n  cargarCorte() {');
  fs.writeFileSync('src/app/features/corte-caja/corte-caja.component.ts', ts, 'utf8');
  console.log('TS updated');
} else {
  console.log('TS already contains mostrarReporteGastos');
}
