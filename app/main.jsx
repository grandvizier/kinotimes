var React = require("react");

require('react-safe-render')(React, {
  errorHandler: function (errReport) {
    console.error("Error in the rendering...", errReport.error);
  }
});

var ReactDOM = require("react-dom");
var Navbar = require("./components/Navbar.jsx");
var ShowtimeList = require("./components/ShowtimeList.jsx");
var filmsStore = require("./stores/filmsStore");
var _showtimes = [];
var getFilmsWithTimesCallback = function(showtimes){
    _showtimes = showtimes;
    render();
};
filmsStore.onChange(getFilmsWithTimesCallback);

function render(){
    ReactDOM.render(<Navbar />, document.getElementById("navbar"));
    ReactDOM.render(<ShowtimeList showtimes={_showtimes} />, document.getElementById("container"));
}
render();
