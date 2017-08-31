import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Image } from 'react-bootstrap'

const FilmSmall = ({ onClick, title, img }) => (
    <Col xs={2} onClick={onClick}>
        <Row>
          <div>{title}</div>
        </Row>
        <Row>
          <Col xs={6}>
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