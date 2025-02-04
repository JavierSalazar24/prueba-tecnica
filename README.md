# Proyecto de Consumo de API de Tecnocontrol

## Descripción

Este proyecto consiste en el desarrollo de un sistema que consume el API de Tecnocontrol y extrae información de una base de datos. La información se presenta en un mapa junto con un reporte básico de los eventos respectivos.

## Funcionalidad

1. **Consumo del API de Tecnocontrol:** Obtiene la lista de unidades ligadas al token de autenticación.
2. **Obtención de Eventos:** Recupera la información de eventos de una unidad específica.
3. **Generación de Reporte:** Extrae información desde la base de datos utilizando filtros de unidad y fechas.
4. **Integración con Mapa:** Muestra en un mapa la ubicación actual de las unidades mediante la API de Google Maps.

## Tecnologías Utilizadas

- **Frontend:** React.js
- **Backend:** Node.js con Express
- **Base de Datos:** Oracle
- **API de Mapas:** Google Maps
- **Autenticación:** Token de Tecnocontrol
