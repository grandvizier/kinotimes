var React = require("react");
var ReactDOM = require("react-dom");
var FilmList = require("./components/FilmList.jsx");

var _films = [{name:"Lovedale",tagline:"this is a wonderful life"},
                {name:"Bishop",tagline:"Another great film"}];

function render(){
    ReactDOM.render(<FilmList films={_films} />, document.getElementById("container"));
}
render();