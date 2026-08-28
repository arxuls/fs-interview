# Mostrar toneladas por estado para una fecha

## Contexto

Al cierre del día, operaciones reporta cuántas toneladas quedaron entregadas, en tránsito, pendientes y canceladas. Hoy ese reporte se arma sumando a mano desde la tabla de despachos, y los errores de suma llegan al reporte que se envía al cliente. El sistema no ofrece ninguna vista agregada: solo lista despachos individuales.

## Criterios de aceptación

**AC1.** CUANDO el usuario elige una fecha, EL SISTEMA muestra el total de toneladas por estado de ese día.

**AC2.** EL SISTEMA muestra siempre los cuatro estados; un estado sin despachos en esa fecha vale `0`.

**AC3.** SI la fecha elegida no tiene despachos, EL SISTEMA muestra los totales en `0`, no un error.

**AC4.** SI se solicita una fecha inválida, ENTONCES EL SISTEMA rechaza la solicitud.
