import { Injectable, signal } from '@angular/core';

export interface ConfirmConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  public modalState = signal<{ config: ConfirmConfig, resolve: (value: boolean) => void } | null>(null);

  confirm(config: ConfirmConfig): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.modalState.set({ config, resolve });
    });
  }

  respond(result: boolean) {
    const current = this.modalState();
    if (current) {
      current.resolve(result);
      this.modalState.set(null);
    }
  }

  generarDiffText(original: any, actual: any): string {
    const baseMsg = '¿Estás seguro que deseas salir? Tienes cambios sin guardar.';
    if (!original || !actual) return baseMsg;
    
    let diffs = [];
    for (const key of Object.keys(original)) {
      if (typeof original[key] === 'object') continue;
      
      const valOrig = original[key] || '(vacío)';
      const valAct = actual[key] || '(vacío)';
      
      if (valOrig !== valAct) {
        diffs.push(`• ${key}: ${valOrig} ➔ ${valAct}`);
      }
    }
    
    if (diffs.length === 0) return baseMsg;
    return `${baseMsg}\n\nCambios detectados:\n${diffs.join('\n')}`;
  }
}
