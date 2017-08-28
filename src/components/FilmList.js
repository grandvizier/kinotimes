import React from 'react'
import PropTypes from 'prop-types'
import Film from './Film'

const FilmList = ({ films, onFilmClick }) => (
  <ul>
    {films.map(film => (
      <Film key={film._id} {...film} onClick={() => onFilmClick(film._id)} />
    ))}
  </ul>
)

FilmList.propTypes = {
  films: PropTypes.array.isRequired,
  onFilmClick: PropTypes.func.isRequired
}

export default FilmList
