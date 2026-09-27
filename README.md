# AUP POS - Frontend (Angular)

Este es el repositorio del frontend para el sistema AUP POS, construido con Angular 17+ y TailwindCSS.

## Configuración y Ejecución (Entorno Local)

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Configura el entorno:
   Verifica que `src/environments/environment.ts` (o `environment.development.ts`) apunte a la URL correcta de tu backend (por defecto `http://localhost:3000`).
3. Levanta el servidor de desarrollo:
   ```bash
   npm start
   # o alternativamente:
   ng serve -o
   ```
   La aplicación se abrirá en `http://localhost:4200`.

## Despliegue a Producción (Railway)

Este repositorio está conectado a **Railway** para despliegue continuo. 
Cualquier `git push origin master` disparará un nuevo build utilizando el script de compilación y se publicará automáticamente.

## Documentación para Pruebas (QA)
Por favor consulta el archivo `MANUAL_QA.md` en la raíz de este repositorio para conocer los casos de uso y qué probar en el sistema.
