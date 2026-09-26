import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let mensajeAmigable = 'Error de conexión. Por favor intente de nuevo.';

      if (error.status === 401) {
        mensajeAmigable = 'Sesión expirada. Por favor inicie sesión nuevamente.';
      } else if (error.status === 403) {
        mensajeAmigable = 'No tiene permisos para realizar esta acción.';
      } else if (error.status === 404) {
        mensajeAmigable = 'El recurso solicitado no fue encontrado.';
      } else if (error.status === 422) {
        mensajeAmigable = error.error?.message || 'Datos inválidos. Verifique la información.';
      } else if (error.status === 500) {
        mensajeAmigable = 'Error interno del servidor. Contacte al administrador.';
      } else if (error.status === 0) {
        mensajeAmigable = 'Sin conexión a internet. Verifique su red.';
      }

      console.error(`[HTTP ${error.status}] ${error.url}:`, error.message);

      // Attach friendly message to the error object for components to use
      return throwError(() => ({ ...error, mensajeAmigable }));
    })
  );
};
