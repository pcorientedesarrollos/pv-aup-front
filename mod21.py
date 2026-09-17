# -*- coding: utf-8 -*-
import re

with open('src/app/features/home/home.component.html', 'r', encoding='utf-8') as f:
    text = f.read()

start_cards = text.find('<!-- Tarjetas de KPIs -->')
end_cards = text.find('<!-- Gráfica -->')
if end_cards == -1: end_cards = text.find('<!-- Gr\u00e1fica -->')
if end_cards == -1: end_cards = text.find('<!--')

if start_cards != -1 and end_cards != -1:
    new_cards = '''<!-- Tarjetas de KPIs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        
        <!-- KPI Ventas Hoy -->
        <div class="metric-card bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col justify-center transition-all hover:-translate-y-1 hover:shadow-md">
          <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Ventas Hoy</p>
          <p class="text-2xl font-black text-slate-800">{{ resumen()?.ventasHoy | currency }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ resumen()?.ticketsHoy }} ticket(s)</p>
        </div>

        <!-- KPI Esta Semana -->
        <div class="metric-card bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col justify-center transition-all hover:-translate-y-1 hover:shadow-md">
          <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Esta Semana</p>
          <p class="text-2xl font-black text-amber-500">{{ resumen()?.ventasSemana | currency }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ resumen()?.ticketsSemana }} ticket(s)</p>
        </div>

        <!-- KPI Este Mes -->
        <div class="metric-card bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col justify-center transition-all hover:-translate-y-1 hover:shadow-md">
          <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Este Mes</p>
          <p class="text-2xl font-black text-emerald-600">{{ resumen()?.ventasMes | currency }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ resumen()?.ticketsMes }} ticket(s)</p>
        </div>

        <!-- KPI Devoluciones Hoy -->
        <div class="metric-card bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col justify-center transition-all hover:-translate-y-1 hover:shadow-md">
          <p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Devoluciones Hoy</p>
          <p class="text-2xl font-black text-indigo-500">{{ resumen()?.devolucionesHoy | currency }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ resumen()?.ticketsDevolucionesHoy }} devolución(es)</p>
        </div>

        <!-- KPI Sin Stock -->
        <div class="metric-card bg-red-50 rounded-lg shadow-sm border border-red-200 p-4 flex flex-col justify-center transition-all hover:-translate-y-1 hover:shadow-md">
          <p class="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-1">Sin Stock</p>
          <p class="text-2xl font-black text-red-600">{{ resumen()?.sinStock }}</p>
          <p class="text-xs text-red-400 mt-1">productos sin existencias</p>
        </div>

      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      '''
    text = text[:start_cards] + new_cards + text[end_cards:]
    with open('src/app/features/home/home.component.html', 'w', encoding='utf-8') as f:
        f.write(text)
