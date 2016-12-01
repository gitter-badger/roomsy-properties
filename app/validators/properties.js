var PROPERTY_VALIDATION_SCHEMA = {
    'name'              : { notEmpty: true },
    'numberOfRooms'     : { notEmpty: true, isInt: {min: 1} },
    'region'            : { notEmpty: true },
    'address'           : { optional: true },
    'city'              : { optional: true },
    'postalCode'        : { optional: true },
    'phoneNumber'       : { optional: true },
    'fax'               : { optional: true },
    'email'             : { optional: true, isEmail: true },
    'website'           : { optional: true },

    'owner'             : { notEmpty: true, isMongoId: true },
    'employees'         : { optional: true }
};


exports.validateGetRequest = function(req, res, next) {

    req.checkQuery('userId').notEmpty();

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
        next();
    });
};

// Create new property
exports.validatePostRequest = function(req, res, next) {

    req.checkBody(PROPERTY_VALIDATION_SCHEMA);

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
        next();
    });
};

exports.validatePutRequest = function(req, res, next) {

    req.checkParams('propertyId').notEmpty().isMongoId();
    req.checkBody(PROPERTY_VALIDATION_SCHEMA);

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
        next();
    });
};