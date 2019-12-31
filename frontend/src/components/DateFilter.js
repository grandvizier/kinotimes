import React from 'react'
import PropTypes from 'prop-types'

import Datetime from 'react-datetime'
import moment from 'moment'
import { Grid } from '@material-ui/core';
require('moment/locale/de');

const DateFilter = ({ updateClick, handleStartDate, handleEndDate }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        Time:
      </Grid>
      <Grid item xs>
        <Datetime locale="de" onChange={handleStartDate} defaultValue={moment()} />
      </Grid>
      <Grid item xs>
        <Datetime locale="de" onChange={handleEndDate} defaultValue={moment().add(4, 'days')} />
      </Grid>
      <Grid item xs>
        <button onClick={e => {
          e.preventDefault()
          updateClick()
        }} >Update Dates</button>
      </Grid>
    </Grid>
  )
}

DateFilter.propTypes = {
  updateClick: PropTypes.func.isRequired,
  handleStartDate: PropTypes.func.isRequired,
  handleEndDate: PropTypes.func.isRequired
}

export default DateFilter