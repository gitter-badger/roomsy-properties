var validate = require('validator');


var customValidators = {
    isArray: (value) => Array.isArray(value),
    eachNotEmpty: (value) => {
        if (!Array.isArray(value)) return false;
        for(let each of value) if (!each) return false;
        return true;
    }
}


module.exports = {
    customValidators: customValidators
}