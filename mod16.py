# -*- coding: utf-8 -*-
import re

with open('src/app/features/gastos/gastos.component.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    '''monto = signal<number | null>(null);''',
    '''monto = signal<number | null>(null);
  idCategoria = signal<number | null>(null);
  observaciones = signal('');
  categorias = signal<any[]>([]);'''
)

text = text.replace(
    '''ngOnInit() {
    this.cargarGastos();
  }''',
    '''ngOnInit() {
    this.cargarGastos();
    this.cargarCategorias();
  }
  
  cargarCategorias() {
    this.http.get<any[]>(environment.apiUrl + '/pos/gastos/categorias').subscribe({
      next: (data) => this.categorias.set(data),
      error: (e) => console.error(e)
    });
  }'''
)

text = text.replace(
    '''const payload = {
      concepto: this.concepto(),
      monto: this.monto()
    };''',
    '''const payload = {
      concepto: this.concepto(),
      monto: this.monto(),
      idCategoria: this.idCategoria(),
      observaciones: this.observaciones()
    };'''
)

text = text.replace(
    '''this.concepto.set('');
        this.monto.set(null);''',
    '''this.concepto.set('');
        this.monto.set(null);
        this.idCategoria.set(null);
        this.observaciones.set('');'''
)

with open('src/app/features/gastos/gastos.component.ts', 'w', encoding='utf-8') as f:
    f.write(text)
