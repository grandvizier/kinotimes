import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'
import MapFilmsWithTimes from '../containers/MapFilmsWithTimes'

const Theater = ({ onClick, name, street, kietz, website, showtimes, filters }) => {
  if (showtimes.length < 1) {
    return null
  }

  return (
  <Panel header={name}>
    <span className="theaterDetails">{street} {kietz} {website}</span>
    <MapFilmsWithTimes showtimes={showtimes} onClick={onClick} filters={filters} />
  </Panel>
)}

Theater.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Theater