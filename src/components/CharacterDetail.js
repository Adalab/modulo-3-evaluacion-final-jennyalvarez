// Importamos React y los hooks que necesitamos
import React, { useState, useEffect } from 'react';
// Importamos herramientas de React Router
import { useParams, useNavigate, useLocation } from 'react-router-dom';
// Importamos los estilos de este componente
import './CharacterDetail.css';

/**
 * Componente que muestra el detalle completo de un personaje
 * Aparece cuando hacemos clic en una tarjeta de personaje
 */
const CharacterDetail = () => {
  // useParams nos permite obtener el parámetro de la URL (el id del personaje)
  // Si la URL es /character/harry-potter, id será "harry-potter"
  const { id } = useParams();

  // useNavigate nos da una función para cambiar de página
  const navigate = useNavigate();

  // useLocation nos permite saber en qué página estamos (no lo usamos aquí, pero está disponible)

  // ESTADO: Aquí guardamos la información que cambia

  // Guardamos el personaje que estamos mostrando
  const [character, setCharacter] = useState(null);

  // Guardamos si estamos cargando datos
  const [isLoading, setIsLoading] = useState(true);

  // Guardamos la casa del personaje (para hacer la petición correcta)
  const [house, setHouse] = useState('gryffindor');

  // EFECTO: Cuando el componente se monta o cambia el id, buscamos el personaje
  useEffect(() => {
    // Primero obtenemos la casa guardada en localStorage
    // Si no hay ninguna guardada, usamos gryffindor por defecto
    const savedHouse = localStorage.getItem('selectedHouse') || 'gryffindor';
    setHouse(savedHouse);

    // Hacemos una petición a la API para obtener todos los personajes de esa casa
    fetch(`https://hp-api.onrender.com/api/characters/house/${savedHouse}`)
      // Convertimos la respuesta a JSON
      .then((response) => response.json())
      // Cuando tenemos los datos, buscamos el personaje que queremos
      .then((data) => {
        // BUSCAR EL PERSONAJE:
        // Primero intentamos encontrarlo por id
        let foundCharacter = null;
        
        // Recorremos todos los personajes
        for (let i = 0; i < data.length; i++) {
          const char = data[i];
          
          // Creamos el mismo id que creamos en CharacterCard
          let charId = '';
          if (char.id) {
            // Si tiene id, lo usamos
            charId = char.id;
          } else {
            // Si no tiene id, creamos uno desde el nombre
            // Primero convertimos el nombre a minúsculas
            const nameLower = char.name.toLowerCase();
            // Luego reemplazamos los espacios por guiones
            // /\s+/g significa: busca uno o más espacios y reemplázalos por '-'
            charId = nameLower.replace(/\s+/g, '-');
          }
          
          // Comparamos con el id de la URL
          if (charId === id) {
            foundCharacter = char;
            break; // Si lo encontramos, salimos del bucle
          }
        }

        // Si no lo encontramos por id, intentamos por nombre
        if (!foundCharacter) {
          // Convertimos el id de la URL de vuelta a nombre
          // Ejemplo: "harry-potter" -> "harry potter"
          // /-/g significa: busca todos los guiones y reemplázalos por espacio
          const nameFromId = id.replace(/-/g, ' ');
          const nameFromIdLower = nameFromId.toLowerCase();
          
          // Buscamos el personaje cuyo nombre coincida
          for (let i = 0; i < data.length; i++) {
            const char = data[i];
            if (char.name) {
              const charNameLower = char.name.toLowerCase();
              if (charNameLower === nameFromIdLower) {
                foundCharacter = char;
                break; // Si lo encontramos, salimos del bucle
              }
            }
          }
        }

        // Guardamos el personaje encontrado (o null si no se encontró)
        setCharacter(foundCharacter);
        setIsLoading(false); // Ya no estamos cargando
      })
      // Si hay un error, lo mostramos en la consola
      .catch((error) => {
        console.error('Error al obtener personaje:', error);
        setIsLoading(false);
      });
  }, [id]); // Este efecto se ejecuta cada vez que cambia el id

  /**
   * Función que se ejecuta cuando el usuario hace clic en "Volver"
   * Navega a la página anterior en el historial
   */
  const handleGoBack = () => {
    navigate(-1); // -1 significa "página anterior"
  };

  // CASO 1: Si está cargando, mostramos un mensaje
  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Cargando personaje...</p>
      </div>
    );
  }

  // CASO 2: Si no se encontró el personaje, mostramos un error
  if (!character) {
    return (
      <div className="error-container">
        <p>Personaje no encontrado</p>
        <button onClick={handleGoBack} className="back-button">
          Volver
        </button>
      </div>
    );
  }

  // CASO 3: Si encontramos el personaje, mostramos su información detallada

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

  // NOMBRES ALTERNATIVOS: Formateamos los nombres alternativos
  // La API puede devolver un array vacío o con nombres
  let alternateNames = 'No tiene nombres alternativos';
  
  // Verificamos si existe el array de nombres alternativos
  if (character.alternate_names) {
    // Verificamos si el array tiene al menos un elemento
    if (character.alternate_names.length > 0) {
      // Si hay nombres, los unimos con comas y espacios
      alternateNames = character.alternate_names.join(', ');
    }
  }

  // EMBLEMA DE CASA: Obtenemos el emblema según la casa del personaje
  let houseEmblem = '🏰'; // Emblema por defecto
  if (character.house) {
    const houseLower = character.house.toLowerCase();
    if (houseLower.includes('gryffindor')) {
      houseEmblem = '🦁'; // León de Gryffindor
    } else if (houseLower.includes('slytherin')) {
      houseEmblem = '🐍'; // Serpiente de Slytherin
    } else if (houseLower.includes('ravenclaw')) {
      houseEmblem = '🦅'; // Águila de Ravenclaw
    } else if (houseLower.includes('hufflepuff')) {
      houseEmblem = '🦡'; // Tejón de Hufflepuff
    }
  }

  // COLOR DE CASA: Obtenemos el color según la casa del personaje
  let houseColor = '#666666'; // Color por defecto
  if (character.house) {
    const houseLower = character.house.toLowerCase();
    if (houseLower.includes('gryffindor')) {
      houseColor = '#c8102e'; // Rojo de Gryffindor
    } else if (houseLower.includes('slytherin')) {
      houseColor = '#2d6234'; // Verde de Slytherin
    } else if (houseLower.includes('ravenclaw')) {
      houseColor = '#0e4b99'; // Azul de Ravenclaw
    } else if (houseLower.includes('hufflepuff')) {
      houseColor = '#f0c75e'; // Amarillo de Hufflepuff
    }
  }

  // ICONO DE ESTADO: Obtenemos el icono según si está vivo o muerto
  let statusIcon = '💀'; // Calavera por defecto (muerto)
  if (character.alive) {
    statusIcon = '❤️'; // Corazón si está vivo
  }

  // TEXTO DE ESTADO: Obtenemos el texto según si está vivo o muerto
  let statusText = 'Muerto/a';
  if (character.alive) {
    statusText = 'Vivo/a';
  }

  // GÉNERO: Convertimos el género del inglés al español
  let genderText = 'Desconocido';
  if (character.gender === 'male') {
    genderText = 'Masculino';
  } else if (character.gender === 'female') {
    genderText = 'Femenino';
  }

  // CASA: Obtenemos el texto de la casa o un mensaje por defecto
  let houseText = 'Sin casa asignada';
  if (character.house) {
    houseText = character.house;
  }

  // Renderizamos el detalle del personaje
  return (
    <div className="character-detail">
      {/* Botón para volver al listado */}
      <button onClick={handleGoBack} className="back-button">
        ← Volver al listado
      </button>

      {/* Contenedor principal con toda la información */}
      <article className="character-detail__content">
        {/* Imagen del personaje o mensaje "Sin imagen" */}
        {hasValidImage ? (
          <img
            src={imageUrl}
            alt={character.name || 'Personaje sin nombre'}
            className="character-detail__image"
          />
        ) : (
          <div className="character-detail__no-image">
            Sin imagen
          </div>
        )}

        {/* Información detallada del personaje */}
        <div className="character-detail__info">
          {/* Nombre del personaje */}
          <h1 className="character-detail__name">
            {character.name || 'Sin nombre'}
          </h1>

          {/* Lista de detalles */}
          <div className="character-detail__details">
            {/* Casa con emblema */}
            <p className="character-detail__house">
              <strong>Casa:</strong>{' '}
              <span
                className="house-badge"
                style={{ color: houseColor }}
              >
                {houseEmblem} {houseText}
              </span>
            </p>

            {/* Estado (vivo o muerto) con icono */}
            <p className="character-detail__status">
              <strong>Estado:</strong>{' '}
              <span className="status-badge">
                {statusIcon} {statusText}
              </span>
            </p>

            {/* Género */}
            <p>
              <strong>Género:</strong> {genderText}
            </p>

            {/* Especie */}
            <p>
              <strong>Especie:</strong>{' '}
              {character.species || 'Especie desconocida'}
            </p>

            {/* Nombres alternativos */}
            <p>
              <strong>Nombres alternativos:</strong> {alternateNames}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default CharacterDetail;
