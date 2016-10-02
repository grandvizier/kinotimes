var React = require("react");
var ProjectionistEdit = require("./ProjectionistEdit.jsx");


module.exports = React.createClass({
   render:function(){
       return(
          <div className=".col-xs-12">
              {
                  this.props.films.map(function(f,index){
                      return(
                          <ProjectionistEdit info={f} key={"film"+index} />
                      )
                  })
              }
          </div>
       )
   }
});
