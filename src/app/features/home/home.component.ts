import { environment } from '../../../environments/environment';
import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  resumen = signal<{
    ventasHoy: number;
    totalClientes: number;
    movimientosHoy: number;
    ultimosMovimientos: any[];
    ventasSemana: number[];
    topProductos: any[];
  } | null>(null);

  cargando = signal(true);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarResumen();
  }

  cargarResumen() {
    this.http.get<any>('/dashboard/resumen').subscribe({
      next: (data) => {
        this.resumen.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar dashboard', err);
        this.cargando.set(false);
      }
    });
  }
}
