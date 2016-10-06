var React = require("react"),
moment = require('moment'),
_ = require('lodash');


// override isEmpty using _.isEmpty(obj, true)
// check that all nested arrays in an object are empty
_.mixin( function() {
    var _isEmptyOrig = _.isEmpty;
        return {
        isEmpty: function(value, defined) {
            if (defined && _.isObject(value)) {
                return !_.some( value, function(innerValue, key) {
                    return innerValue !== undefined && !_isEmptyOrig(innerValue);
                });
            }
            return _isEmptyOrig(value);
        }
    }
}());

var daysToShow = 4;

function mapTimestoDays(showtimes){
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

function createDayView(mappedTimes){
    return _.map(mappedTimes, function(mapped, key){
        return(
            <div className="col-xs-3">
                <div className="panel-heading">{moment(key, 'x').add(-6, 'hours').format('ddd Do')}</div>
                {eachTime(_.sortBy(mapped, ['timestamp']))}
            </div>
        )
    })
}
function eachTime(mapped){
    return _.map(mapped, function(t){
        return(
            <div className="showtime">{moment(t.timestamp).format('LT')}
                <div className="small">({t._theater.name})</div>
            </div>
        )
    });
}

function showFilmDetails(film){
    var filmDetails = (film.details) ? film.details : {};
    return(
      <div className="panel-body col-xs-4">
          <h3>{film.title}</h3>
          <div className="allDetails small">
            <div className="row">
                <div className="details col-xs-8">
                    {filmDetails.genre}
                </div>
                <span>{filmDetails.year}</span>
            </div>
            <div className="row">
                <div className="details col-xs-8">
                    {filmDetails.director ? 'Director: ' + filmDetails.director : null}
                </div>
                <span>{filmDetails.rating}</span>
            </div>
            <div className="row">
                <div className="details col-xs-12 small">
                    {filmDetails.actors}
                </div>
                <span>{(filmDetails.language && filmDetails.language.indexOf("English") !== -1) ? null : filmDetails.language}</span>
            </div>
            <div className="row">
                <div className="details col-xs-8">
                    <em>{filmDetails.description}</em>
                </div>
                <img className="img-responsive img-thumbnail pull-right" src={film.img} />
            </div>
          </div>
      </div>
    )
}


module.exports = React.createClass({
    render:function(){
        var mappedShowtimes = mapTimestoDays(this.props.info.showtimes);
        if(_.isEmpty(mappedShowtimes, true)){
            return false;
        }
        return(
            <div className="panel panel-default col-xs-10">
                <div className="panel-heading">
                    {this.props.info.title}
                </div>
                {showFilmDetails(this.props.info)}
                <div className="panel-body col-xs-8">
                    <div className="panel panel-info">
                        {createDayView(mappedShowtimes)}
                    </div>
                </div>
            </div>
        )
    }
});

