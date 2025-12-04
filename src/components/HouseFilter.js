// Importamos React
import React from 'react';
// Importamos PropTypes para validar las props
import PropTypes from 'prop-types';
// Importamos los estilos de este componente
import './HouseFilter.css';

/**
 * Componente que muestra un menú desplegable para filtrar personajes por casa
 * 
 * Recibe dos props (propiedades):
 * - selectedHouse: la casa actualmente seleccionada
 * - handleHouseChange: función que se ejecuta cuando el usuario cambia la casa
 */
const HouseFilter = ({ selectedHouse = 'gryffindor', handleHouseChange }) => {
  // Definimos un array con las 4 casas de Hogwarts
  // value: el valor que usaremos (debe coincidir con lo que espera la API)
  // label: el texto que verá el usuario (con mayúscula y más bonito)
  const houses = [
    { value: 'gryffindor', label: 'Gryffindor' },
    { value: 'slytherin', label: 'Slytherin' },
    { value: 'ravenclaw', label: 'Ravenclaw' },
    { value: 'hufflepuff', label: 'Hufflepuff' },
  ];

  // Devolvemos el HTML que queremos mostrar
  return (
    <div className="house-filter">
      {/* Etiqueta que describe el campo (buena práctica de accesibilidad) */}
      <label htmlFor="house-select" className="house-label">
        Selecciona la Casa:
      </label>
      
      {/* Menú desplegable (select) */}
      <select
        id="house-select" // El id debe coincidir con el htmlFor del label
        value={selectedHouse} // El valor seleccionado viene del estado
        onChange={(ev) => handleHouseChange(ev.target.value)} // Cuando cambia, ejecutamos la función
        className="house-select" // Clase CSS para darle estilo
      >
        {/* Recorremos el array de casas y creamos una opción para cada una */}
        {houses.map((house) => (
          <option key={house.value} value={house.value}>
            {house.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Validamos las props que recibe el componente
HouseFilter.propTypes = {
  selectedHouse: PropTypes.string.isRequired,
  handleHouseChange: PropTypes.func.isRequired,
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default HouseFilter;
