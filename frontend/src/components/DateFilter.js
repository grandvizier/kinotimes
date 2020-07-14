import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker";
import { Grid } from '@material-ui/core';
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({ updateClick, startDate, endDate, handleStartDate, handleEndDate }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        Time:
      </Grid>
      <Grid item xs>
        <DatePicker
          selected={startDate}
          onChange={handleStartDate}
          showTimeSelect
          timeIntervals={60}
          dateFormat="d MMM - HH:mm"
          todayButton="Now"
          minDate={new Date()}
          />
      </Grid>
      <Grid item xs>
        <DatePicker
          selected={endDate}
          onChange={handleEndDate}
          showTimeSelect
          timeIntervals={60}
          dateFormat="d MMM - HH:mm"
          todayButton="Now"
          minDate={new Date()}
        />
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