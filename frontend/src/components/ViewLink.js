import React from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

const ViewLink = ({ allFilters, active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <button onClick={e => {
      e.preventDefault()
      ReactGA.event({
        category: 'View',
        action: 'Change View'
      });
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