import { environment } from '../../../environments/environment';
import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
  stats = signal<any>(null);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarResumen();
    this.cargarStats();
  }

  cargarStats() {
    this.http.get<any>(`${environment.apiUrl}/pos/dashboard/stats`).subscribe({
      next: (data) => this.stats.set(data),
      error: (err) => console.error(err)
    });
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
