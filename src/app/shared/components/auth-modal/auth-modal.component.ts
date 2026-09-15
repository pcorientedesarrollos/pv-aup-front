import { Component, EventEmitter, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html'
})
export class AuthModalComponent {
  @Output() onConfirm = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  private http = inject(HttpClient);
  
  visible = signal(false);
  email = signal('');
  password = signal('');
  cargando = signal(false);
  errorMsg = signal('');
  
  payloadData: any = null;

  open(payload: any) {
    this.payloadData = payload;
    this.email.set('');
    this.password.set('');
    this.errorMsg.set('');
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
    this.onCancel.emit();
  }

  confirmar() {
    if (!this.email() || !this.password()) {
      this.errorMsg.set('Correo y contraseña obligatorios');
      return;
    }

    this.cargando.set(true);
    this.errorMsg.set('');

    this.http.post<any>(environment.apiUrl + '/pos/auth/login', {
      email: this.email(),
      password: this.password()
    }).subscribe({
      next: (res) => {
        this.cargando.set(false);
        if (res && (res.idPerfil === 1 || res.idPerfil === 3)) {
          this.visible.set(false);
          this.onConfirm.emit(this.payloadData);
        } else {
          this.errorMsg.set('El usuario no tiene permisos de Administrador o Soporte');
        }
      },
      error: (err) => {
        this.cargando.set(false);
        this.errorMsg.set('Credenciales incorrectas');
      }
    });
  }
}
