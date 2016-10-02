var React = require("react");
var FilmInfo = require("./FilmInfo.jsx");
var AddImdbId = require("./AddImdbId.jsx");


module.exports = React.createClass({
   render:function(){
       return(
           <div className="row">
                <div className="col-md-6">
                    <AddImdbId/>
                </div>
                <div className="col-md-6">
                    {
                        this.props.films.map(function(f,index){
                            return(
                                <FilmInfo info={f} key={"film"+index} />
                            )
                        })
                    }
                </div>
           </div>
       )
   }
});
