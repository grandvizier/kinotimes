var React = require("react");
var ReactDOM = require("react-dom");
var ProjectionistList = require("../components/ProjectionistList.jsx");
var filmsStore = require("../stores/filmsStore");
var _films = [];
var getFilmsCallback = function(films){
    _films = films;
    render();
};
filmsStore.onChange(getFilmsCallback);

function render(){
    ReactDOM.render(<ProjectionistList films={_films} />, document.getElementById("editContainer"));
}
render();
