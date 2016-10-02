var React = require("react"),
moment = require('moment'),
_ = require('lodash');

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
                mappedTimes[key].push(showtimes[j].timestamp);
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
                {eachTime(mapped)}
            </div>
        )
    })
}
function eachTime(mapped){
    return _.map(mapped, function(t){
        return(<div className="panel-body">{moment(t).format('LT')}</div>)
    });
}

function showFilmDetails(film){
    var filmDetails = (film.details) ? film.details : {};
    return(
      <div className="allDetails">
        <div className="row">
            <div className="details col-xs-6">
                <span className="type col-xs-6">Director</span>
                <span className="value">{filmDetails.director}</span>
            </div>
            <div className="details col-xs-6">
                <span className="type col-xs-4">Rating</span>
                <span className="value">{filmDetails.rating}</span>
            </div>
        </div>
        <div className="row">
            <div className="details col-xs-6">
                <span className="type col-xs-6">Language</span>
                <span className="value">{filmDetails.language}</span>
            </div>
            <div className="details col-xs-6">
                <span className="type col-xs-4">Year</span>
                <span className="value">{filmDetails.year}</span>
            </div>
        </div>
        <div className="details">
            <span className="type col-xs-2">Actors</span>
            <span className="value">{filmDetails.actors}</span>
        </div>
        <div className="details">
            <span className="type col-xs-2">Genre</span>
            <span className="value">{filmDetails.genre}</span>
        </div>
        <div className="details">
            <span className="type col-xs-2">Plot</span>
            <span className="value">{filmDetails.description}</span>
        </div>
        <div className="details col-xs-6">
            <img src={film.img} className="img-responsive img-thumbnail pull-right"/>
        </div>
      </div>
    )
}


module.exports = React.createClass({
    render:function(){
        mappedShowtimes = mapTimestoDays(this.props.info.showtimes);
        return(
            <div className="panel panel-default col-xs-10">
                <div className="panel-heading">
                    {this.props.info.title}
                </div>
                <div className="panel-body col-xs-4">
                    {showFilmDetails(this.props.info)}
                </div>
                <div className="panel-body col-xs-8">
                    <div className="panel panel-info">
                        {createDayView(mappedShowtimes)}
                    </div>
                </div>
            </div>
        )
    }
});

