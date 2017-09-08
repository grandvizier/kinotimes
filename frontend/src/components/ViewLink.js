import React from 'react'
import PropTypes from 'prop-types'

const ViewLink = ({ allFilters, active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <button onClick={e => {
      e.preventDefault()
      onClick()
    }} >
      {children}
    </button>
  )
}

ViewLink.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ViewLink