// Importamos React
import React from 'react';
// Importamos PropTypes para validar las props
import PropTypes from 'prop-types';
// Importamos los estilos de este componente
import './FilterByName.css';

/**
 * Componente que muestra un campo de texto para buscar personajes por nombre
 * 
 * Recibe dos props (propiedades):
 * - filterName: el texto actual del filtro
 * - handleFilterName: función que se ejecuta cuando el usuario escribe
 */
const FilterByName = ({ filterName, handleFilterName }) => {
  /**
   * Función que se ejecuta cuando el usuario envía el formulario (presiona Enter)
   * @param {Event} ev - El evento del formulario
   * 
   * ev.preventDefault() evita que el navegador haga lo que haría normalmente
   * (como recargar la página o cambiar la ruta)
   */
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  /**
   * Función que se ejecuta cada vez que el usuario escribe en el campo
   * @param {Event} ev - El evento del input
   */
  const handleChange = (ev) => {
    // ev.target.value es el texto que escribió el usuario
    // Llamamos a la función que recibimos como prop para actualizar el estado
    handleFilterName(ev.target.value);
  };

  // Devolvemos el HTML que queremos mostrar
  return (
    // Usamos <form> para envolver el input (requisito del ejercicio - semántica)
    <form className="filter-form" onSubmit={handleSubmit}>
      {/* Etiqueta que describe el campo (buena práctica de accesibilidad) */}
      <label htmlFor="filter-name" className="filter-label">
        Busca por personaje:
      </label>
      
      {/* Campo de texto donde el usuario escribe */}
      <input
        id="filter-name"
        type="text" 
        value={filterName} 
        onChange={handleChange} 
        placeholder="Ej.: Harry, Hermione..." 
        className="filter-input" 
      />
    </form>
  );
};

// Validamos las props que recibe el componente
// Esto ayuda a evitar errores y documenta qué espera el componente
FilterByName.propTypes = {
  filterName: PropTypes.string.isRequired,
  handleFilterName: PropTypes.func.isRequired,
};

// Valores por defecto (por si acaso no se pasan)
FilterByName.defaultProps = {
  filterName: '',
};

// Exportamos el componente para que pueda ser usado en otros archivos
export default FilterByName;