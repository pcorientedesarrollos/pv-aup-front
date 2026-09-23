const fs = require('fs');
let ts = fs.readFileSync('src/app/features/historial/historial.component.ts', 'utf8');

// Add HostListener import if missing
if (!ts.includes('HostListener')) {
  ts = ts.replace(/import \{ Component, signal, computed, OnInit \} from '@angular\/core';/, 
    "import { Component, signal, computed, OnInit, HostListener } from '@angular/core';");
}

// Add menuAbierto property and click listener
ts = ts.replace(
  /export class HistorialComponent implements OnInit \{/,
  `export class HistorialComponent implements OnInit {
  menuAbierto: number | null = null;
  
  @HostListener('document:click')
  cerrarMenus() {
    this.menuAbierto = null;
  }`
);

fs.writeFileSync('src/app/features/historial/historial.component.ts', ts, 'utf8');
console.log('Fixed TS');
