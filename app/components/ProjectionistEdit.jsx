var React = require("react");
var actions = require("../actions/FilmActions");

module.exports = React.createClass({
    getInitialState:function(){
      return {
          title: this.props.info.title,
          imdbID:""
      }
    },
    addImdbId:function(e){
        e.preventDefault();
        actions.addImdbId(this.state);
    },
    handleInputChange:function(e){
      e.preventDefault();
      var name = e.target.name;
      var state = this.state;
      state[name] = e.target.value;
      this.setState(state);
    },
    render:function(){
        var imdbUrl = 'http://www.imdb.com/find?ref_=nv_sr_fn&s=all&q='+this.props.info.title;
        var filmDetails = (this.props.info.details) ? this.props.info.details : {};
        return(
          <div className="col-xs-6 editDetails">
            <h4>{this.props.info.title}</h4>
            <div className="row">
              <div className="details col-xs-6">
                <span className="type col-xs-6">Current IMDB</span>
                <span className="value">{this.props.info.imdbID}</span>
              </div>
              <div className="details col-xs-6">
                <span className="type col-xs-4">Country</span>
                <span className="value">{filmDetails.country}</span>
              </div>
            </div>
            <div className="row">
              <div className="details col-xs-6">
                <span className="type col-xs-6">Director</span>
                <span className="value">{filmDetails.director}</span>
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
            <div>
              <a href={imdbUrl} target="_blank">Search IMDB</a>
            </div>

            <form className="updateFilm col-xs-6 form-horizontal" onSubmit={this.addImdbId}>
                <input type="text" className="form-control" id="title" name="title" value={this.props.info.title} readOnly type="hidden" />
                <div className="form-group-sm col-xs-7">
                    <input type="text" className="form-control" id="imdbID" name="imdbID" value={this.state.imdbID} onChange={this.handleInputChange} placeholder="new IMDB id" />
                </div>
                <div className="form-group-sm col-xs-4">
                    <button className="btn btn-sm" type="submit">Update Film</button>
                </div>
            </form>
            <div className="details col-xs-6">
              <img src={this.props.info.img} className="img-responsive img-thumbnail pull-right"/>
            </div>
          </div>
        )
    }
})