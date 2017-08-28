import React from 'react'
import PropTypes from 'prop-types'
import Film from './Film'

const FilterBlock = ({ filterDateTime, filterFilms, allFilms, onFilmClick }) => {
  let filteredFilms = allFilms.filter(function( obj ) {
    return filterFilms.includes(obj.id);
  });

  var divStyle = {
    border: '1px solid'
  };

  return (
    <div style={divStyle}>
      <ul>
        {filteredFilms.map(film => (
          <Film key={film.id} {...film} onClick={() => onFilmClick(film.id)} />
        ))}
      </ul>
    </div>
  )
}

FilterBlock.propTypes = {
  filterDateTime: PropTypes.object.isRequired,
  filterFilms: PropTypes.array.isRequired,
  allFilms: PropTypes.array.isRequired,
  onFilmClick: PropTypes.func.isRequired
}

export default FilterBlock