import React from 'react'
import PropTypes from 'prop-types'

const Film = ({ onClick, name, createdAt }) => (
  <li
    onClick={onClick}
  >
    <p>{name}: <span>{createdAt}</span></p>
  </li>
)

Film.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired
}

export default Film