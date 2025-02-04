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

## Instalación y Ejecución

Este proyecto es un **monorepo**, por lo que para instalarlo correctamente, sigue estos pasos:

1. **Clonar el repositorio:**

   ```sh
   git clone <https://github.com/JavierSalazar24/prueba-tecnica.git>
   cd <prueba-tecnica>
   ```

2. **Instalar dependencias:**

   ```sh
   npm install
   ```

3. **Ejecutar el proyecto (Frontend y Backend):**
   ```sh
   npm run dev
   ```
