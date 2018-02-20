import React from 'react'
import PropTypes from 'prop-types'
import AdminUpdateFilm from './AdminUpdateFilm'

import { Image, Col, Row } from 'react-bootstrap';

const AdminFilm = ({ handleSubmit, _id, title, originalID, imdbID, img, details, showtimes, reviewed }) => {
  let imdbUrl = 'http://www.imdb.com/find?ref_=nv_sr_fn&s=all&q='+title;
  let filmDetails = (details) ? details : {};
  let isfilmReviewd = (reviewed) ? true : false;
  // let showtimesCount = (showtimes.length === 1) ? showtimes[0].timestamp : showtimes.length;
  let showtimesCount = showtimes.length;
  let origin = (originalID ? 'https://www.berlin.de/kino/_bin/'+originalID : '')
  let altTitle = (filmDetails.aka) ? filmDetails.aka : null

  return (
  <Col xs={9} md={6} className={"editDetails "+ (isfilmReviewd ? 'reviewed' : '')} >
    <h4>{title} <small>({showtimesCount})</small></h4>
    {altTitle && <div className="altTitle">{altTitle}</div>}
    <Row>
      <Col xs={6} className="details">
        <span className="type col-xs-6">Current IMDB </span>
        <span className="value"> {imdbID} </span>
      </Col>
      <Col xs={6} className="details">
        <span className="type col-xs-4">Country</span>
        <span className="value">{filmDetails.country}</span>
      </Col>
    </Row>
    <Row>
      <Col xs={6} className="details">
        <span className="type col-xs-6">Director</span>
        <span className="value">{filmDetails.director}</span>
      </Col>
      <Col xs={6} className="details">
        <span className="type col-xs-4">Year</span>
        <span className="value">{filmDetails.year}</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} className="details">
        <span className="type col-xs-2">Actors</span>
        <span className="value">{filmDetails.actors}</span>
      </Col>
    </Row>
    <Row>
      <Col xs={12} className="details">
        <span className="type col-xs-2">Genre</span>
        <span className="value">{filmDetails.genre}</span>
      </Col>
    </Row>
    <Row>
      <Col>
        <a href={imdbUrl} target="_blank">Search IMDB</a>
      </Col>
      <Col>
        <a href={origin} target="_blank">{(originalID ? 'Original data' : '')}</a>
      </Col>
    </Row>

    <Col xs={6} className="updateFilm">
      <AdminUpdateFilm form={`updateImdb_${_id}`} imdbID={imdbID} onSubmit={handleSubmit} />
    </Col>

    <Col sm={6} md={6} className="details">
      <Image src={img} thumbnail responsive className="pull-right" />
    </Col>
  </Col>
)
}

AdminFilm.propTypes = {
  title: PropTypes.string.isRequired
}

export default AdminFilm