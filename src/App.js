// Importamos React y las herramientas que necesitamos
import React, { useState, useEffect } from 'react';
// Importamos React Router para poder navegar entre páginas
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// Importamos nuestros componentes personalizados
import FilterByName from './components/FilterByName';
import HouseFilter from './components/HouseFilter';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
// Importamos los estilos
import './App.css';

/**
 * Este es el componente principal de la aplicación
 * Aquí guardamos el estado de toda la aplicación y manejamos las rutas
 */
function App() {
  // ESTADO: Aquí guardamos la información que cambia en nuestra aplicación

  // Guardamos la lista de personajes que vienen de la API
  const [characters, setCharacters] = useState([]);

  // Guardamos el texto que escribe el usuario para buscar personajes por nombre
  const [filterName, setFilterName] = useState('');

  // Guardamos la casa seleccionada (por defecto es gryffindor como pide el ejercicio)
  const [selectedHouse, setSelectedHouse] = useState('gryffindor');

  // Guardamos si estamos cargando datos de la API (para mostrar un mensaje de "cargando...")
  const [isLoading, setIsLoading] = useState(true);

  // useNavigate nos permite cambiar de página (ruta)
  const navigate = useNavigate();

  // useLocation nos permite saber en qué página estamos
  const location = useLocation();

  // EFECTO 1: Cuando la página carga, recuperamos el filtro de nombre guardado
  // Esto hace que si volvemos atrás, el texto del filtro se mantenga
  useEffect(() => {
    // localStorage es como un "cajón" donde podemos guardar cosas en el navegador
    const savedFilterName = localStorage.getItem('filterName');
    // Solo recuperamos el filtro si estamos en la página principal (no en el detalle)
    if (savedFilterName && location.pathname === '/') {
      setFilterName(savedFilterName);
    }
  }, [location.pathname]);

  // EFECTO 2: Cuando la página carga, recuperamos la casa guardada
  useEffect(() => {
    const savedHouse = localStorage.getItem('selectedHouse');
    if (savedHouse) {
      setSelectedHouse(savedHouse);
    }
  }, []);

  // EFECTO 3: Cuando cambia la casa seleccionada, pedimos nuevos personajes a la API
  useEffect(() => {
    // Primero decimos que estamos cargando
    setIsLoading(true);
    
    // Construimos la URL de la API con la casa seleccionada
    const apiUrl = `https://hp-api.onrender.com/api/characters/house/${selectedHouse}`;
    
    // Hacemos una petición a la API de Harry Potter
    fetch(apiUrl)
      // Convertimos la respuesta a formato JSON (datos que podemos usar)
      .then((response) => {
        return response.json();
      })
      // Cuando tenemos los datos, los guardamos en el estado
      .then((data) => {
        setCharacters(data);
        setIsLoading(false); // Ya no estamos cargando
      })
      // Si hay un error, lo mostramos en la consola
      .catch((error) => {
        console.error('Error al obtener personajes:', error);
        setIsLoading(false);
      });
  }, [selectedHouse]); // Este efecto se ejecuta cada vez que cambia selectedHouse

  /**
   * Función que se ejecuta cuando el usuario escribe en el campo de búsqueda
   * @param {string} name - El texto que escribió el usuario
   */
  const handleFilterName = (name) => {
    // Guardamos el texto en el estado
    setFilterName(name);
    // También lo guardamos en localStorage para que persista al volver atrás
    localStorage.setItem('filterName', name);
  };

  /**
   * Función que se ejecuta cuando el usuario cambia la casa seleccionada
   * @param {string} house - La casa que seleccionó (gryffindor, slytherin, etc.)
   */
  const handleHouseChange = (house) => {
    // Guardamos la casa en el estado (esto activará el efecto que pide datos nuevos)
    setSelectedHouse(house);
    // También lo guardamos en localStorage
    localStorage.setItem('selectedHouse', house);
    
    // Si estamos viendo el detalle de un personaje, volvemos al listado
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  // RENDER: Aquí devolvemos lo que queremos mostrar en pantalla
  return (
    <div className="App">
      {/* Cabecera de la página */}
      <header className="App-header">
        <h1>Harry Potter Characters</h1>
      </header>

      {/* React Router nos permite tener diferentes "páginas" en la misma aplicación */}
      <Routes>
        {/* RUTA 1: Página principal con el listado de personajes */}
        <Route
          path="/"
          element={
            <>
              {/* Contenedor con los filtros (búsqueda por nombre y por casa) */}
              <div className="filters-container">
                {/* Componente para buscar por nombre */}
                <FilterByName
                  filterName={filterName}
                  handleFilterName={handleFilterName}
                />
                {/* Componente para filtrar por casa */}
                <HouseFilter
                  selectedHouse={selectedHouse}
                  handleHouseChange={handleHouseChange}
                />
              </div>
              {/* Componente que muestra la lista de personajes */}
              <CharacterList
                characters={characters}
                filterName={filterName}
                isLoading={isLoading}
              />
            </>
          }
        />

        {/* RUTA 2: Página de detalle de un personaje */}
        {/* El :id es un parámetro dinámico (cambia según el personaje) */}
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en otros archivos
export default App;