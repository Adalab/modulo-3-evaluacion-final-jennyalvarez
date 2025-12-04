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

// Renderizamos (mostramos) nuestra aplicación
root.render(
  // StrictMode es un modo especial de React que ayuda a encontrar problemas
  <React.StrictMode>
    {/* BrowserRouter permite que nuestra app tenga diferentes rutas (páginas) */}
    <BrowserRouter>
      {/* App es nuestro componente principal */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);