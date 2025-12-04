// Importamos React
import React from 'react';
// Importamos PropTypes para validar las props
import PropTypes from 'prop-types';
// Importamos el componente de la tarjeta de personaje
import CharacterCard from './CharacterCard';
// Importamos los estilos de este componente
import './CharacterList.css';

/**
 * Componente que muestra la lista de personajes
 * 
 * Recibe tres props (propiedades):
 * - characters: array con todos los personajes de la API
 * - filterName: el texto que escribió el usuario para buscar
 * - isLoading: si está cargando o no los datos
 */
const CharacterList = ({ characters = [], filterName = '', isLoading = false }) => {
  // FILTRADO: Filtramos los personajes según el nombre que escribió el usuario
  // Usamos el método .filter() que recorre el array y devuelve solo los que cumplen la condición
  const filteredCharacters = characters.filter((character) => {
    // Convertimos el nombre del personaje a minúsculas para comparar
    let characterName = '';
    if (character.name) {
      characterName = character.name.toLowerCase();
    }
    
    // Convertimos el texto de búsqueda también a minúsculas
    const searchName = filterName.toLowerCase();
    
    // Comprobamos si el nombre del personaje contiene el texto de búsqueda
    // .includes() devuelve true si encuentra el texto dentro del nombre
    // Si devolvemos true, el personaje se queda en el array filtrado
    return characterName.includes(searchName);
  });

  // CASO 1: Si está cargando, mostramos un mensaje
  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Cargando personajes...</p>
      </div>
    );
  }

  // CASO 2: Si no hay personajes después de filtrar, mostramos un mensaje
  if (filteredCharacters.length === 0) {
    // Si hay texto de búsqueda, mostramos un mensaje con ese texto
    if (filterName) {
      return (
        <div className="no-results">
          <p>
            No hay ningún personaje que coincida con la palabra{' '}
            <strong>"{filterName}"</strong>
          </p>
        </div>
      );
    } else {
      // Si no hay texto de búsqueda, significa que no hay personajes en general
      return (
        <div className="no-results">
          <p>No hay personajes disponibles</p>
        </div>
      );
    }
  }

  // CASO 3: Si hay personajes, los mostramos en una lista
  return (
    <section className="character-list">
      {/* Usamos <ul> (lista no ordenada) para mostrar las tarjetas */}
      <ul className="character-list__grid">
        {/* Usamos el método .map() que recorre el array y crea un elemento para cada personaje */}
        {/* .map() transforma cada personaje en un elemento <li> con su tarjeta */}
        {filteredCharacters.map((character) => {
          // Para cada personaje, creamos una clave única
          let characterKey = '';
          if (character.id) {
            characterKey = character.id;
          } else {
            characterKey = character.name;
          }
          
          // Devolvemos un elemento <li> con la tarjeta del personaje
          return (
            <li key={characterKey}>
              <CharacterCard character={character} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

// Validamos las props que recibe el componente
CharacterList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default CharacterList;