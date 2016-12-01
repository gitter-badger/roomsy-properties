var validate = require('validator')

exports.validateGetAssociatedPropertiesParams = function(params) {

    var validationErrors = [];

    if (!params.userId) validationErrors.push('missing userId');
    else if (!validate.isMongoId(params.userId)) validationErrors.push('userId is invalid or malformatted');

    return validationErrors;
};