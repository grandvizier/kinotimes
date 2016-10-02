var React = require("react");
var FilmWithTimes = require("./FilmWithTimes.jsx");


module.exports = React.createClass({
   render:function(){
       return(
          <div className=".col-xs-12">
              {
                  this.props.showtimes.map(function(s,index){
                      return(
                          <FilmWithTimes info={s} key={"showtimes"+index} />
                      )
                  })
              }
          </div>
       )
   }
});
