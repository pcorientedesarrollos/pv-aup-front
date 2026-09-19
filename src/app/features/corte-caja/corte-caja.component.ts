import { environment } from '../../../environments/environment';
import { Component, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TicketPrinterService } from '../../core/services/ticket-printer.service';
import { PaginacionComponent } from '../../shared/components/paginacion/paginacion.component';

@Component({
  selector: 'app-corte-caja',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginacionComponent],
  templateUrl: './corte-caja.component.html',
})
export class CorteCajaComponent implements OnInit {
  fechaCorte = signal(new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)); // Hoy local
  cargando = signal(false);
  
  datosCorte = signal<any>(null);
  
  // Para la apertura
  montoApertura = signal<number>(0);
  nombreCajero = signal<string>('');

  // Para el conteo manual
  efectivoContado = signal<number | null>(null);
  
  corteRealizado = signal(false);

  // Para el historial (solo admins)
  historialCortes = signal<any[]>([]);
  
  paginaActual = signal(1);
  tamanoPagina = signal(10);
  
  totalPaginas = computed(() => Math.ceil(this.historialCortes().length / this.tamanoPagina()) || 1);

  cortesPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.tamanoPagina();
    const fin = inicio + this.tamanoPagina();
    return this.historialCortes().slice(inicio, fin);
  });

  constructor(
    private http: HttpClient, 
    private router: Router, 
    public auth: AuthService,
    private printer: TicketPrinterService
  ) {}

  ngOnInit() {
    this.nombreCajero.set(this.auth.sesion()?.usuario || 'CAJERO PRINCIPAL');
    this.cargarCorte();
    if (this.isAdmin()) {
      this.cargarHistorialCortes();
    }
  }

  isAdmin() {
    return this.auth.sesion()?.idPerfil === 1 || this.auth.sesion()?.idPerfil === 3;
  }

  cargarHistorialCortes() {
    this.http.get<any[]>(`${environment.apiUrl}/pos/cortes`).subscribe({
      next: (data) => this.historialCortes.set(data),
      error: (err) => console.error('Error al cargar historial de cortes', err)
    });
  }

  
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
    let url = `${environment.apiUrl}/pos/gastos`;
    const params = [];
    if (this.fechaDesde()) params.push(`desde=${this.fechaDesde()}`);
    if (this.fechaHasta()) params.push(`hasta=${this.fechaHasta()}`);
    if (params.length > 0) url += `?${params.join('&')}`;

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

  cargarCorte() {
    this.cargando.set(true);
    this.corteRealizado.set(false);
    this.efectivoContado.set(null);
    
    const idUsuario = this.auth.sesion()?.idUsuario || 1;
    const url = `${environment.apiUrl}/pos/corte-actual/${idUsuario}`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        if (!data) {
           this.datosCorte.set(null);
        } else {
            this.datosCorte.set({
             idCorte: data.corte.idCorte,
             fechaCorte: data.corte.fechaApertura,
             montoApertura: Number(data.corte.fondoInicial),
             totalTeoricoFisico: data.resumen.totalIngresos,
             ventasEfectivo: data.resumen.totalEfectivo,
             ventasTarjeta: data.resumen.totalTarjeta,
             ventasTransferencia: data.resumen.totalTransferencia,
             salidas: data.resumen.totalGastos,
             devoluciones: data.resumen.totalCancelado,
             abierta: true,
             fondoCaja: Number(data.corte.fondoInicial),
             numeroVentas: data.corte.ventas ? data.corte.ventas.length : '...', 
             totalVentas: data.resumen.totalEfectivo + data.resumen.totalTarjeta + data.resumen.totalTransferencia,
             totalTeorico: data.resumen.totalIngresos
           });
        }
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar corte', err);
        this.cargando.set(false);
      }
    });
  }

  abrirCaja() {
    if (this.montoApertura() < 0) {
      alert('El monto no puede ser negativo.');
      return;
    }

    this.cargando.set(true);
    const payload = {
      nombre: this.nombreCajero(),
      montoApertura: this.montoApertura(), idUsuario: this.auth.sesion()?.idUsuario
    };

    this.http.post(`${environment.apiUrl}/pos/abrir-turno`, payload).subscribe({
      next: () => {
        alert('Turno abierto exitosamente.');
        this.cargarCorte(); // Recargar para mostrar el modo Corte
      },
      error: (err) => {
        console.error('Error al abrir turno:', err);
        alert('Ocurrió un error al abrir el turno.');
        this.cargando.set(false);
      }
    });
  }

  calcularDiferencia(): number {
    if (this.efectivoContado() === null || !this.datosCorte()) return 0;
    // Solo comparar contra lo que debe haber físicamente en el cajón:
    // fondo inicial de apertura + ventas cobradas en efectivo
    const esperadoEnCajon = (this.datosCorte().fondoCaja || 0) + (this.datosCorte().ventasEfectivo || 0) - (this.datosCorte().salidas || 0);
    return this.efectivoContado()! - esperadoEnCajon;
  }

  realizarCorte() {
    if (this.efectivoContado() === null) {
      alert('Por favor, ingresa el efectivo contado en caja.');
      return;
    }
    
    this.cargando.set(true);
    const payload = {
      idCorte: this.datosCorte()?.idCorte,
      efectivoEscaner: this.efectivoContado()
    };

    this.http.post(`${environment.apiUrl}/pos/corte`, payload).subscribe({
      next: () => {
        this.cargando.set(false);
        this.corteRealizado.set(true);
        // Cerramos el turno en frontend para bloquear ventas
        this.auth.cerrarTurno();
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem('corteRealizadoEnSesion', 'true');
        }
      },
      error: (err) => {
        console.error('Error al realizar corte:', err);
        alert('Hubo un error al registrar el corte oficial.');
        this.cargando.set(false);
      }
    });
  }

  imprimirReporteZ() {
    const data = this.datosCorte();
    if (!data) return;

    this.printer.imprimirCorteCaja({
      ...data,
      efectivoContado: this.efectivoContado(),
      diferencia: this.calcularDiferencia()
    });
  }
  corteSeleccionado = signal<any>(null);
  cargandoDetalle = signal(false);

  verDetalle(corte: any) {
    this.cargandoDetalle.set(true);
    this.http.get<any>(environment.apiUrl + '/pos/corte/' + corte.idCorte).subscribe({
      next: (data) => {
        this.corteSeleccionado.set(data);
        this.cargandoDetalle.set(false);
      },
      error: (err) => {
        console.error(err);
        this.cargandoDetalle.set(false);
      }
    });
  }

  cerrarDetalle() {
    this.corteSeleccionado.set(null);
  }
}



