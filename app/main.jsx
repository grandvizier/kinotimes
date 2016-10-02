var React = require("react");
var ReactDOM = require("react-dom");
var FilmList = require("./components/FilmList.jsx");
var filmsStore = require("./stores/filmsStore");
var _films = [];
var getFilmsCallback = function(films){
    _films = films;
    render();
};
filmsStore.onChange(getFilmsCallback);

function render(){
    ReactDOM.render(<FilmList films={_films} />, document.getElementById("container"));
}
render();
