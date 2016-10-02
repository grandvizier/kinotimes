var dispatcher = require("../dispatcher");

module.exports = {
    addImdbId:function(film){
        dispatcher.dispatch({
           film:film,
           type:"film:addImdbId"
        });
    }
}