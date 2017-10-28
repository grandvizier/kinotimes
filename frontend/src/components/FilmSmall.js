import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Image } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const FilmSmall = ({ onClick, title, img }) => (
    <Col xs={4} onClick={onClick} className="filteredFilm">
        <FontAwesome name='plus-circle' size="2x" className="addFilm"/>
        <Row>
          <div>{title}</div>
        </Row>
        <Row>
          <Col xs={9}>
            <Image src={img} thumbnail responsive />
          </Col>
        </Row>
    </Col>
)

FilmSmall.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default FilmSmall