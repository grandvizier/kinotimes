import React from 'react'
import PropTypes from 'prop-types'
import Film from './Film'

const FilmList = ({ films, onFilmClick }) => (
  <ul>
    {films.map(film => (
      <Film key={film.id} {...film} onClick={() => onFilmClick(film.id)} />
    ))}
  </ul>
)

FilmList.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  onFilmClick: PropTypes.func.isRequired
}

export default FilmList
