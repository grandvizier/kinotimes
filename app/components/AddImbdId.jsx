var React = require("react");
var actions = require("../actions/FilmActions");

module.exports = React.createClass({
    getInitialState:function(){
      return {
          title:"",
          imdbID:""
      }
    },
    addImbdId:function(e){
        e.preventDefault();
        actions.addImbdId(this.state);
    },
    handleInputChange:function(e){
      e.preventDefault();
      var name = e.target.name;
      var state = this.state;
      state[name] = e.target.value;
      this.setState(state);
    },
    render:function(){
        return(
            <form className="form" onSubmit={this.addImbdId}>
                <div className="form-group">
                    <label className="control-label" htmlFor="title">Film Title:</label>
                    <input type="text" className="form-control" id="title" name="title" value={this.state.title} onChange={this.handleInputChange} placeholder="Film Title" />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="imdbID">IMDB id:</label>
                    <input type="text" className="form-control" id="imdbID" name="imdbID" value={this.state.imdbID} onChange={this.handleInputChange} placeholder="IMDB id" />
                </div>
                <div className="form-group">
                    <button className="btn" type="submit">Update Film</button>
                </div>
            </form>
        )
    }
})