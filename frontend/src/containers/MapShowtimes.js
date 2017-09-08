import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
const mapObj = require('lodash/map');

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const mapTimestoDays = (showtimes) => {
    var daysToShow = 4;
    var mappedTimes = {};
    for(var i = 0; i < daysToShow; i++){
        var timeCap = moment.utc(moment().add(i, 'days').format("YYYY-MM-DD")).add(26, 'hours').format('x');
        mappedTimes[timeCap] = [];
    }
    // todo - use obj foreach()
    for(var j = 0; j < showtimes.length; j++){
        for(var key in mappedTimes){
            var t = moment(showtimes[j].timestamp);
            if(t.format('X') <= moment().format('X')){
                // ignore old showtimes
                break;
            } else if(t.format('X') <= key){
                mappedTimes[key].push(showtimes[j]);
                break;
            }
        }
    }
    return mappedTimes;
}

const EachTime = ({ t }) => {
  return (
    <div className="showtime">{moment(t.timestamp).format('LT')}
        <div className="small">({t._theater.name})</div>
    </div>
  )
}

const DayView = ({ day, mapped }) => {
  return (
    <div className="col-xs-3">
      <div className="panel-heading">{moment(day, 'x').add(-6, 'hours').format('ddd Do')}</div>
      {mapObj(mapped, (t) => (
        <EachTime key={uuidv4()} t={t} />
      ))}
    </div>
  )
}

class MapShowtimes extends Component {
  render() {
    return (
      <div>
        {mapObj(this.props.mappedShowtimes, (mapped, key) => (
          <DayView key={uuidv4()} day={key} mapped={mapped} />
        ))}
      </div>
    )
  }
}




const mapStateToProps = (state, ownProps) => {
  return {
    mappedShowtimes: mapTimestoDays(ownProps.showtimes)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}


MapShowtimes = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapShowtimes)

export default MapShowtimes