import React from 'react'
import PropTypes from 'prop-types'
import FilmSmall from './FilmSmall'
import { Grid } from '@material-ui/core'

const FilterBlock = ({ filterDateTime, filterFilms, allFilms, onFilmClick }) => {
  let filteredFilms = allFilms.filter(function( obj ) {
    return filterFilms.includes(obj._id);
  });

  return (
    <Grid container className="smallBorder">
        {filteredFilms.map(film => (
            <FilmSmall key={film._id} {...film} onClick={() => onFilmClick(film._id)} />
        ))}
    </Grid>
  )
}

FilterBlock.propTypes = {
  filterDateTime: PropTypes.object.isRequired,
  filterFilms: PropTypes.array.isRequired,
  allFilms: PropTypes.array.isRequired,
  onFilmClick: PropTypes.func.isRequired
}

export default FilterBlock
