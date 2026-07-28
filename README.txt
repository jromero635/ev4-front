Integrantes
Joaquín Romero

Tecnologías utilizadas

React
React Router DOM
Axios
Bootstrap
JavaScript
CSS

Instalación

Clonar el repositorio: https://github.com/jromero635/ev4-front.git
Ingresar al proyecto: cd mascotas-front
Instalar dependencias: npm install axios react-router-dom bootstrap
Ejecutar el proyecto:npm run dev

Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizo ChatGPT como apoyo para:
Identificar y solucionar errores del código con mayor precisión.
Comprender el funcionamiento de FormData para el envío de imágenes a la API.
Mostrar mensajes de validación más claros para los errores 400, utilizando la expresión:
setError(Object.values(error.response?.data)[0][0]);
 Implementar el manejo de errores utilizando error.response?.status y error.response?.data.