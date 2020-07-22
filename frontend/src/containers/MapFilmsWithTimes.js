import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import {
  toggleFilmFilter
} from '../actions'
import SmallFilm from '../components/SmallFilm'
const mapObj = require('lodash/map');

const uid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3);
    return v.toString(16);
  });
}

const compressShowtimes = (showtimes, filters) => {
    let films = {}
    showtimes.forEach(function(showtime) {
        if ( filters.filterFilms.includes(showtime._film._id) ) {
            return;
        }
        if (showtime._film._id in films) {
            films[showtime._film._id].times.push(showtime.timestamp)
        } else {
            films[showtime._film._id] = {
                film_id: showtime._film._id,
                film_title: showtime._film.title,
                film_details: showtime._film.details,
                film_image: showtime._film.img,
                times: [showtime.timestamp]
            }
        }
    })
    return films;
}

class MapFilmsWithTimes extends Component {
  render() {
    return (
      <Grid container className="theaterTimes">
        {mapObj(this.props.filmAndTimes, (sm_film, key) => (
          <SmallFilm key={uid()} {...sm_film} />
        ))}
      </Grid>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    filmAndTimes: compressShowtimes(ownProps.showtimes, ownProps.filters),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFilmClick: toggleFilmFilter
  }
}


MapFilmsWithTimes = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapFilmsWithTimes)

export default MapFilmsWithTimes
