var dispatcher = require("../dispatcher");

module.exports = {
    addImbdId:function(film){
        dispatcher.dispatch({
           film:film,
           type:"film:addImbdId"
        });
    }
}