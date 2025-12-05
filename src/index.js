// Importamos React
import React from 'react';
// Importamos ReactDOM para poder renderizar (mostrar) nuestra aplicación en el navegador
import ReactDOM from 'react-dom/client';
// Importamos BrowserRouter de React Router para poder usar rutas en nuestra app
import { BrowserRouter } from 'react-router-dom';
// Importamos los estilos globales
import './index.css';
// Importamos nuestro componente principal
import App from './App';

// Creamos una "raíz" donde vamos a mostrar nuestra aplicación
// document.getElementById('root') es el elemento <div id="root"></div> del HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Obtener el basename desde la variable de entorno PUBLIC_URL
// React Scripts configura automáticamente PUBLIC_URL basándose en el campo "homepage" de package.json
// En desarrollo será undefined (usamos '/') y en producción será '/modulo-3-evaluacion-final-jennyalvarez'
const basename = process.env.PUBLIC_URL || '/';

// Renderizamos (mostramos) nuestra aplicación
console.log('React está intentando montar la app');
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
console.log('React ha ejecutado root.render');