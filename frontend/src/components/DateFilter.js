import React from 'react'
import PropTypes from 'prop-types'

import Datetime from 'react-datetime'
import moment from 'moment'
require('moment/locale/de');

const DateFilter = ({ onClick, handleStartDate, handleEndDate }) => {
  return (
    <div>
    <Datetime locale="de" onChange={handleStartDate} defaultValue={moment()} />
    <Datetime locale="de" onChange={handleEndDate} defaultValue={moment().add(4, 'days')} />

    <button onClick={e => {
      e.preventDefault()
      onClick()
    }} >Update Dates</button>
    </div>
  )
}

DateFilter.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleStartDate: PropTypes.func.isRequired,
  handleEndDate: PropTypes.func.isRequired
}

export default DateFilter