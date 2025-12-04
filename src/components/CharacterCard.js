// Importamos React
import React from 'react';
// Importamos PropTypes para validar las props
import PropTypes from 'prop-types';
// Importamos useNavigate de React Router para poder cambiar de página
import { useNavigate } from 'react-router-dom';
// Importamos los estilos de este componente
import './CharacterCard.css';

/**
 * Componente que muestra la tarjeta de un personaje
 * Muestra la foto, nombre y especie
 * Al hacer clic, navega a la página de detalle
 * Recibe una prop:
 * - character: objeto con la info del personaje
 */
const CharacterCard = ({ character = {} }) => {
  // useNavigate nos da una función para cambiar de página
  const navigate = useNavigate();

  /*
   Función que se ejecuta cuando el usuario hace clic en la tarjeta
   */
  const handleClick = () => {
    // Creamos un ID único para el personaje
    let characterId;
    if (character.id) {
      // Si tiene id, lo usamos
      characterId = character.id;
    } else {
      // Si no tiene id, creamos uno desde el nombre
      // Primero convertimos el nombre a minúsculas
      const nameLower = character.name.toLowerCase();
      // Luego reemplazamos los espacios por guiones
      // /\s+/g: busca uno o más espacios y reemplázalos por '-'
      characterId = nameLower.replace(/\s+/g, '-');
    }
    
    // Vamos a la página de detalle del personaje
    navigate(`/character/${characterId}`);
  };

  // IMAGEN: Decidimos qué imagen mostrar
  // Algunos personajes no tienen imagen en la API o tienen URLs vacías
  let hasValidImage = false;
  if (character.image) {
    const imageTrimmed = character.image.trim();
    if (imageTrimmed !== '') {
      // Verificamos si empieza con http (es una URL válida)
      if (imageTrimmed.startsWith('http://') || imageTrimmed.startsWith('https://')) {
        hasValidImage = true;
      }
    }
  }
  
  let imageUrl = '';
  if (hasValidImage) {
    imageUrl = character.image;
  }

  // NOMBRE Y ESPECIE: Preparamos los textos para mostrar
  let characterName = 'Sin nombre';
  if (character.name) {
    characterName = character.name;
  }
  const characterNameUpper = characterName.toUpperCase();

  let characterSpecies = 'Especie desconocida';
  if (character.species) {
    characterSpecies = character.species;
  }
  const characterSpeciesUpper = characterSpecies.toUpperCase();

  // CLASE CSS: Decidimos qué clase usar para el contenedor de imagen
  let imageContainerClass = 'character-card__image-container';
  if (!hasValidImage) {
    imageContainerClass = 'character-card__image-container character-card__image-container--no-image';
  }

  // Devolvemos el HTML que queremos mostrar
  return (
    // <article> es una etiqueta semántica para contenido independiente
    <article className="character-card" onClick={handleClick}>
      {/* Contenedor de la imagen para mejor control del tamaño */}
      <div className={imageContainerClass}>
        {/* Imagen del personaje o mensaje "Sin imagen" */}
        {hasValidImage ? (
          <img
            src={imageUrl}
            alt={character.name || 'Personaje sin nombre'}
            className="character-card__image"
            // Agregamos loading="lazy" para mejorar el rendimiento
            loading="lazy"
          />
        ) : (
          <div className="character-card__no-image">
            Sin imagen
          </div>
        )}
      </div>
      
      {/* Información del personaje */}
      <div className="character-card__info">
        {/* Nombre del personaje - en MAYÚSCULAS */}
        <h2 className="character-card__name">
          {characterNameUpper}
        </h2>
        
        {/* Especie del personaje - en MAYÚSCULAS */}
        <p className="character-card__species">
          {characterSpeciesUpper}
        </p>
      </div>
    </article>
  );
};

// Validamos las props que recibe el componente
CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    species: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default CharacterCard;
