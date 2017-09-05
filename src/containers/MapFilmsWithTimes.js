import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Row, Col, Image } from 'react-bootstrap'
import {
  toggleFilmFilter
} from '../actions'
const mapObj = require('lodash/map');

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const compressShowtimes = (showtimes) => {
    let films = {}
    showtimes.forEach(function(showtime) {
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
    <Col xs={2} className="film">
        <Row>
          {film.film_title}
        </Row>
        <Row>
          <Col xs={6} className="details">
              <Image src={film.film_image} thumbnail responsive />
          </Col>
          <Col xs={6} className="details">
              {film.times.map(time => (
                  <EachTime key={uuidv4()} t={time} />
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
          <FilmView key={uuidv4()} film={film} onClick={() => this.props.onFilmClick(film.film_id)} />
        ))}
      </Row>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    filmAndTimes: compressShowtimes(ownProps.showtimes),
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