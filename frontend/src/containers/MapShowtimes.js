import React, { Component } from 'react'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
const mapObj = require('lodash/map');
dayjs.extend(LocalizedFormat)
dayjs.extend(advancedFormat)

const uid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3);
    return v.toString(16);
  });
}

const mapTimestoDays = (showtimes) => {
    var daysToShow = 4;
    var mappedTimes = {};
    for(var i = 0; i < daysToShow; i++){
        var timeCap = dayjs(dayjs().add(i, 'days').format("YYYY-MM-DD")).add(26, 'hours').unix();
        mappedTimes[timeCap] = [];
    }
    // todo - use obj foreach()
    for(var j = 0; j < showtimes.length; j++){
        for(var key in mappedTimes){
            var t = dayjs(showtimes[j].timestamp);
            if(t.unix() <= dayjs().subtract(2, 'hours').unix()){
                // ignore old showtimes
                break;
            } else if(t.unix() <= key){
                mappedTimes[key].push(showtimes[j]);
                break;
            }
        }
    }
    return mappedTimes;
}

const EachTime = ({ t }) => {
  return (
    <div className="showtime">{dayjs(t.timestamp).format('LT')}
        <div className="small">({t._theater.name})</div>
    </div>
  )
}

const DayView = ({ day, mapped }) => {
  dayjs.locale('en');
  mapped.sort(function(a, b) {
      return dayjs(a.timestamp).format('x') - dayjs(b.timestamp).format('x');
  })
  return (
    <div className="col-xs-3">
      <div className="panel-heading">{dayjs(day, 'x').add(-6, 'hours').format('ddd Do')}</div>
      {mapObj(mapped, (t) => (
        <EachTime key={uid()} t={t} />
      ))}
    </div>
  )
}

class MapShowtimes extends Component {
  render() {
    return (
      <div>
        {mapObj(this.props.mappedShowtimes, (mapped, key) => (
          <DayView key={uid()} day={key} mapped={mapped} />
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