var React = require("react");
var FilmInfo = require("./FilmInfo.jsx");
var AddImbdId = require("./AddImbdId.jsx");


module.exports = React.createClass({
   render:function(){
       return(
           <div className="row">
                <div className="col-md-6">
                    <AddImbdId/>
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
