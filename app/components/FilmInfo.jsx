var React = require("react");

module.exports = React.createClass({
    render:function(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.info.title}
                </div>
                <div className="panel-body">
                    {this.props.info.imdbID}
                    <img src={this.props.info.img} alt="-" className="img-responsive thumbnail"/>
                </div>
            </div>
        )
    }
})