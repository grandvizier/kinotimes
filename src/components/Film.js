import React from 'react'
import PropTypes from 'prop-types'
import { Col, Panel } from 'react-bootstrap'

const Film = ({ onClick, title, imdbID, img, details, showtimes, reviewed }) => {
  let filmDetails = (details) ? details : {};

  return (
  <Panel header={title}>
    <Col xs={4} onClick={onClick}>
      <div className="allDetails small">
        <div className="row">
            <div className="details col-xs-8">
                {filmDetails.genre}
            </div>
            <span>{filmDetails.year}</span>
        </div>
        <div className="row">
            <div className="details col-xs-8">
                {filmDetails.director ? 'Director: ' + filmDetails.director : null}
            </div>
            <span>{filmDetails.rating}</span>
        </div>
        <div className="row">
            <div className="details col-xs-12 small">
                {filmDetails.actors}
            </div>
            <span>{(filmDetails.language && filmDetails.language.indexOf("English") !== -1) ? null : filmDetails.language}</span>
        </div>
        <div className="row">
            <div className="details col-xs-8">
                <em>{filmDetails.description}</em>
            </div>
            <img className="img-responsive img-thumbnail pull-right" alt="" src={img} />
        </div>
      </div>
    </Col>
    <div className="panel-body col-xs-8">
      <div className="panel panel-info">
        createDayView(mappedShowtimes)
      </div>
    </div>
  </Panel>
)}

Film.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
  // details: PropTypes.object.isRequired,
  // createdAt: PropTypes.number.isRequired
}

export default Film