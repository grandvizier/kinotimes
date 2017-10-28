import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Panel } from 'react-bootstrap'
import MapShowtimes from '../containers/MapShowtimes'
import FontAwesome from 'react-fontawesome'

const Film = ({ onClick, title, imdbID, img, details, showtimes, reviewed }) => {
  let filmDetails = (details) ? details : {};
  let imagePath = (img !== 'N/A') ? img : '/image_not_found.jpg';
  // don't show films if there's no times to display
  if (!showtimes.length) {
    return null
  }
  let detailsStyle = "allDetails small" + (reviewed ? '' : ' reviewed') // the reviewed class greys things out

  return (
  <Panel header={title}>
    <Col xs={4} className={detailsStyle}>
        <Row>
            <Col xs={8} className="details">
                {filmDetails.genre}
            </Col>
            <span>{filmDetails.year}</span>
        </Row>
        <Row>
            <Col xs={8} className="details">
                {filmDetails.director ? 'Director: ' + filmDetails.director : null}
            </Col>
            <span>{filmDetails.rating}</span>
        </Row>
        <Row>
            <Col xs={12} className="details small">
                {filmDetails.actors}
            </Col>
            <span className="language">
              {(filmDetails.language && filmDetails.language.indexOf("English") !== -1) ? null : filmDetails.language}
            </span>
        </Row>
        <Row>
            <Col xs={8} className="details">
                <em>{filmDetails.description}</em>
            </Col>
            <img className="img-responsive img-thumbnail pull-right" alt="" src={imagePath} />
        </Row>
        <Row className="filterOut" onClick={onClick}>
          <FontAwesome name='ban' size="1x"/>
          <span className="filterText">filter</span>
        </Row>
    </Col>
    <div className="panel-body col-xs-8">
      <div className="panel panel-info">
        <MapShowtimes showtimes={showtimes} />
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