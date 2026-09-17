import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos.component.html'
})
export class GastosComponent implements OnInit {
  private http = inject(HttpClient);
  
  gastos = signal<any[]>([]);
  cargando = signal(false);
  
  mostrarModal = signal(false);
  concepto = signal('');
  monto = signal<number | null>(null);
  idCategoria = signal<number | null>(null);
  observaciones = signal('');
  categorias = signal<any[]>([]);
  guardando = signal(false);

  busqueda = signal('');
  paginaActual = signal(1);
  tamanoPagina = signal(15);
  
  gastosFiltrados = computed(() => {
    const term = this.busqueda().toLowerCase();
    return this.gastos().filter(g => 
      g.concepto?.toLowerCase().includes(term) ||
      g.usuario?.nombreCompleto?.toLowerCase().includes(term)
    );
  });

  gastosPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.tamanoPagina();
    const fin = inicio + this.tamanoPagina();
    return this.gastosFiltrados().slice(inicio, fin);
  });
  
  totalPaginas = computed(() => Math.ceil(this.gastosFiltrados().length / this.tamanoPagina()) || 1);

  ngOnInit() {
    this.cargarGastos();
    this.cargarCategorias();
  }
  
  cargarCategorias() {
    this.http.get<any[]>(environment.apiUrl + '/pos/gastos/categorias').subscribe({
      next: (data) => this.categorias.set(data),
      error: (e) => console.error(e)
    });
  }

  cargarGastos() {
    this.cargando.set(true);
    this.http.get<any[]>(environment.apiUrl + '/pos/gastos').subscribe({
      next: (res) => {
        this.gastos.set(res);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  abrirModal() {
    this.concepto.set('');
    this.monto.set(null);
    this.mostrarModal.set(true);
  }

  cerrarModal() {
    this.mostrarModal.set(false);
  }

  registrarGasto() {
    if (!this.concepto() || !this.monto()) {
      alert('Debes ingresar un concepto y un monto.');
      return;
    }
    this.guardando.set(true);
    
    this.http.post(environment.apiUrl + '/pos/gastos', {
      concepto: this.concepto(),
      monto: this.monto()
    }).subscribe({
      next: () => {
        this.guardando.set(false);
        this.cerrarModal();
        this.cargarGastos();
      },
      error: (err) => {
        this.guardando.set(false);
        alert(err.error?.message || 'Error al registrar el gasto. Asegúrate de tener un turno de caja abierto.');
      }
    });
  }

  cambiarPagina(delta: number) {
    const nueva = this.paginaActual() + delta;
    if (nueva >= 1 && nueva <= this.totalPaginas()) {
      this.paginaActual.set(nueva);
    }
  }
}
