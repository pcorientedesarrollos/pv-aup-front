# Manual de Usuario - AUP POS (Guía de Pruebas QA)

Bienvenido al manual de uso del sistema **AUP POS** (Apicultores Unidos de la Península). Esta guía está diseñada para que el personal encargado de probar el sistema (QA) conozca el flujo principal de trabajo y sepa qué funcionalidades debe verificar en cada módulo.

---

## 1. Acceso al Sistema (Login)
1. Ingresa a la URL del sistema.
2. Inicia sesión con tus credenciales asignadas (Correo y Contraseña).
3. **Puntos a probar:**
   - Intentar ingresar con credenciales incorrectas (debe mostrar error).
   - Verificar que al ingresar correctamente, te redirija al Dashboard.

---

## 2. Apertura y Corte de Caja (¡Importante!)
Para poder realizar ventas, el cajero **debe** tener un turno abierto.
1. Ve al menú lateral izquierdo y selecciona **Corte de Caja**.
2. **Apertura:** Si la caja está cerrada, ingresa el "Fondo Inicial" (dinero base en caja) y haz clic en "Abrir Caja".
3. **Cierre (Corte):** Al final de la jornada o turno, en esta misma pantalla verás el total de ventas y gastos. Ingresa el "Efectivo Declarado" (lo que contaste físicamente) y cierra el turno.
4. **Puntos a probar:**
   - Intentar ir al *Punto de Venta* sin abrir caja (el sistema debe bloquear o advertir).
   - Realizar un cierre de caja con un descuadre mayor a $500 (el sistema debe lanzar una advertencia pero permitir el cierre).

---

## 3. Punto de Venta (POS) - Creando una Venta
El corazón del sistema. Aquí se registran las transacciones de los clientes.
1. Ve al menú **Punto de Venta (F1)**.
2. **Búsqueda:** Usa la barra superior para buscar productos por código de barras, nombre o categoría. También puedes hacer clic en las tarjetas de productos.
3. **Carrito:** Modifica cantidades o elimina productos desde el panel derecho.
4. **Cliente:** Selecciona a un cliente registrado o déjalo como "Público en General".
5. **Cobro:** Selecciona el método de pago (Efectivo, Tarjeta, Transferencia) e ingresa el monto recibido para calcular el cambio.
6. Haz clic en **Completar Venta**.
7. **Puntos a probar:**
   - Vender un producto que no tiene stock (verificar advertencia).
   - Cobrar una venta mixta o revisar que el cálculo del cambio sea correcto.
   - Verificar la impresión del ticket (botón imprimir al terminar).

---

## 4. Cotizaciones
Permite guardar presupuestos para clientes sin afectar el inventario.
1. Ve a **Cotizaciones** y haz clic en "Nueva Cotización".
2. Funciona igual que el Punto de Venta: agrega productos, selecciona cliente y guarda.
3. **Puntos a probar:**
   - Convertir una cotización "Pendiente" en una Venta real.
   - Cancelar una cotización.
   - Generar el PDF de la cotización.

---

## 5. Facturación (CFDI 4.0)
Generación de facturas electrónicas válidas ante el SAT (Integración con Facturama).
1. Ve a **Facturas CFDI**.
2. Puedes facturar desde una Venta (en Historial de Ventas) o crear una factura global.
3. **Puntos a probar:**
   - Verificar que los datos del cliente incluyan RFC, Régimen Fiscal y Código Postal correctos.
   - Intentar facturar y revisar la respuesta del sistema (puede estar en modo prueba).

---

## 6. Inventario y Kardex
Control total de las existencias.
1. **Productos:** Ve a `Inventario > Productos`. Crea, edita o elimina productos. Asigna precios, costos y stock mínimo.
2. **Kardex:** Ve a `Inventario > Kardex`. Aquí verás el historial de movimientos de CADA producto (entradas por compra, salidas por venta, devoluciones).
3. **Puntos a probar:**
   - Crear un producto nuevo y asignarle una imagen.
   - Hacer una venta de ese producto y luego revisar el Kardex para comprobar que el stock bajó exactamente en la cantidad vendida.

---

## 7. Gastos
Registro de salidas de dinero que no son compras de inventario (luz, agua, papelería).
1. Ve a **Gastos** y añade un nuevo gasto.
2. **Puntos a probar:**
   - Registrar un gasto en efectivo.
   - Ir al "Corte de Caja" y verificar que el dinero de este gasto se haya **restado** del efectivo esperado en caja.

---

## 8. Diseño y Navegación (Pruebas Visuales)
1. **Puntos a probar (Responsividad):**
   - Abre el sistema en una computadora de escritorio y luego achica la ventana del navegador para simular un celular.
   - Revisa que las tablas generen una barra de desplazamiento horizontal y no corten la información.
   - Abre y cierra el menú lateral repetidamente para asegurar que el contenido se ajusta de inmediato sin parpadeos.
