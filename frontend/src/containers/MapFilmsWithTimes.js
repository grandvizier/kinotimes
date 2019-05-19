import React, { Component } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { Grid, Typography } from '@material-ui/core'
import {
  toggleFilmFilter
} from '../actions'
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
                film_image: showtime._film.img,
                times: [showtime.timestamp]
            }
        }
    })
    return films;
}


const EachTime = ({ t }) => {
  return (
    <Typography className="showtime">{dayjs(t).format('h:mm a Do MMM')}</Typography>
  )
}

const FilmView = ({ film }) => {
  return (
    <Grid container className="film">
        <Grid item>
            <Typography>{film.film_title}</Typography>
        </Grid>
        <Grid container>
          <Grid item xs={9} className="details">
              <img src={film.film_image} alt={film.film_title} />
          </Grid>
          <Grid item xs={6} className="details showtimes">
              {film.times.map(time => (
                  <EachTime key={uid()} t={time} />
              ))}
          </Grid>
        </Grid>
    </Grid>
  )
}

class MapFilmsWithTimes extends Component {
  render() {
    return (
      <Grid container className="theaterTimes">
        {mapObj(this.props.filmAndTimes, (film, key) => (
          <FilmView key={uid()} film={film} onClick={() => this.props.onFilmClick(film.film_id)} />
        ))}
      </Grid>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    filmAndTimes: compressShowtimes(ownProps.showtimes, ownProps.filters),
    onFilmClick: ownProps.onClick
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
