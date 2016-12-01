var GET_REQUEST_VALIDATION_SCHEMA = {
    userId: { notEmpty: true },
    propertyId: { notEmpty: true, isMongoId: true }
};


exports.validateGetRequest = function(req, res, next) {

    req.checkQuery(GET_REQUEST_VALIDATION_SCHEMA);

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
        next();
    });
};
