import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Row, Col, Image } from 'react-bootstrap'
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
    <div className="showtime">{moment(t).format('h:mm a Do MMM')}</div>
  )
}

const FilmView = ({ film }) => {
  return (
    <Col md={2} xs={3} className="film">
        <Row>
          {film.film_title}
        </Row>
        <Row>
          <Col xs={9} className="details">
              <Image src={film.film_image} thumbnail responsive />
          </Col>
          <Col xs={6} className="details showtimes">
              {film.times.map(time => (
                  <EachTime key={uid()} t={time} />
              ))}
          </Col>
        </Row>
    </Col>
  )
}

class MapFilmsWithTimes extends Component {
  render() {
    return (
      <Row className="theaterTimes">
        {mapObj(this.props.filmAndTimes, (film, key) => (
          <FilmView key={uid()} film={film} onClick={() => this.props.onFilmClick(film.film_id)} />
        ))}
      </Row>
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