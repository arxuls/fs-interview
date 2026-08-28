# Permitir filtrar los despachos por estado

## Contexto

La vista de despachos muestra siempre todos los registros. Cuando el coordinador logístico necesita revisar la flota en tránsito, o los despachos cancelados del día para reasignar camiones, recorre la tabla completa a ojo. Con el volumen actual ya es incómodo; con más despachos por día se vuelve inviable.

## Criterios de aceptación

**AC1.** CUANDO el usuario elige un estado, EL SISTEMA muestra solo los despachos de ese estado.

**AC2.** CUANDO no hay ningún filtro activo, EL SISTEMA muestra todos los despachos, igual que hoy.

**AC3.** SI se solicita un estado que no existe, ENTONCES EL SISTEMA rechaza la solicitud en lugar de devolver una lista vacía.

**AC4.** MIENTRAS un filtro está activo, EL SISTEMA lo mantiene cuando los datos se refrescan.
