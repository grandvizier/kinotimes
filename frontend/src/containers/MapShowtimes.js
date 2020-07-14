import React, {Component} from 'react'
import {connect} from 'react-redux'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import {Typography, Grid} from "@material-ui/core";


const styles = {
    showtimeDate: {
        margin: '10px',
    },
    showtimeListing: {
        margin: '5px',
    },
    showtimeRow: {
        paddingBottom: '5px',
        borderBottom: '2px solid rgba(67,54,25,0.6)',
    }
};

const mapObj = require('lodash/map');
dayjs.extend(advancedFormat)

const uid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3);
        return v.toString(16);
    });
}

const mapTimestoDays = (showtimes) => {
    var daysToShow = 4;
    var mappedTimes = {};
    for (var i = 0; i < daysToShow; i++) {
        var timeCap = dayjs(dayjs().add(i, 'days').format("YYYY-MM-DD")).add(26, 'hours').unix();
        mappedTimes[timeCap] = [];
    }
    // todo - use obj foreach()
    for (var j = 0; j < showtimes.length; j++) {
        for (var key in mappedTimes) {
            var t = dayjs(showtimes[j].timestamp);
            if (t.unix() <= dayjs().subtract(2, 'hours').unix()) {
                // ignore old showtimes
                break;
            } else if (t.unix() <= key) {
                mappedTimes[key].push(showtimes[j]);
                break;
            }
        }
    }
    return mappedTimes;
}

const EachTime = ({t, theater}) => {
    return (
        <Grid item className="showtime" style={styles.showtimeListing}>{dayjs(t.timestamp).format('H:mm')}
            <Typography variant="body2">
                ({theater.name})
            </Typography>
        </Grid>
    )
}

const DayView = ({day, mapped, theaters}) => {
    dayjs.locale('en');
    mapped.sort(function (a, b) {
        return dayjs(a.timestamp).format('x') - dayjs(b.timestamp).format('x');
    })
    return (
        <Grid container style={styles.showtimeRow}>
            <Grid item xs={1} className="showtime-date" style={styles.showtimeDate}>
                <Typography variant="subtitle1" styles="{text-decoration: underline}">
                    {dayjs.unix(day).add(-6, 'hours').format('ddd Do')}
                </Typography>
            </Grid>
            {mapObj(mapped, (t) => (
                <EachTime key={uid()} t={t} theater={theaters[t._theater]}/>
            ))}
        </Grid>
    )
}

class MapShowtimes extends Component {
    render() {
        return (
            <Grid item xs={12}>
                {mapObj(this.props.mappedShowtimes, (mapped, key) => (
                    <DayView key={uid()} day={key} mapped={mapped} theaters={this.props.theaters}/>
                ))}
            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mappedShowtimes: mapTimestoDays(ownProps.showtimes)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}


MapShowtimes = connect(
    mapStateToProps,
    mapDispatchToProps
)(MapShowtimes)

export default MapShowtimes
