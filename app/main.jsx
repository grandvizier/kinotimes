var React = require("react");
var ReactDOM = require("react-dom");
var ShowtimeList = require("./components/ShowtimeList.jsx");
var filmsStore = require("./stores/filmsStore");
var _showtimes = [];
var getFilmsWithTimesCallback = function(showtimes){
    _showtimes = showtimes;
    render();
};
filmsStore.onChange(getFilmsWithTimesCallback);

function render(){
    ReactDOM.render(<ShowtimeList showtimes={_showtimes} />, document.getElementById("container"));
}
render();
