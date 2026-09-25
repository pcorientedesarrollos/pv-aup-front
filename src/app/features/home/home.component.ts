import { environment } from '../../../environments/environment';
import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  resumen = signal<any>(null);

  cargando = signal(true);

  // Configuración de la gráfica
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        label: 'Ventas de la semana',
        fill: true,
        tension: 0.4,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        pointBackgroundColor: '#f59e0b',
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(ctx.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: true, color: '#f3f4f6' },
        ticks: { callback: (v) => '$' + v }
      },
      x: { grid: { display: false } }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarResumen();
  }

  cargarResumen() {
    this.http.get<any>(`${environment.apiUrl}/pos/dashboard/stats`).subscribe({
      next: (data) => {
        this.resumen.set(data);

        // graficaDias es un array de {fecha, total} de los últimos 7 días
        if (data?.graficaDias && data.graficaDias.length > 0) {
          this.lineChartData = {
            labels: data.graficaDias.map((d: any) => d.fecha),
            datasets: [
              {
                ...this.lineChartData.datasets[0],
                data: data.graficaDias.map((d: any) => d.total)
              }
            ]
          };
        }

        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar dashboard', err);
        this.cargando.set(false);
      }
    });
  }
}
