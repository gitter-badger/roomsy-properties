var express = require('express');
var relationshipsRouter = express.Router();

//------------------------------------------------------------------------
// Models
var Property = Utils.getModel('Property');

//------------------------------------------------------------------------
// Validator
var validator = Utils.getValidator('relationships');

//------------------------------------------------------------------------
// API paths

// Get relationships between a property and user
relationshipsRouter.get('/', validator.validateGetRequest, (req, res, next) => {

    Property
        .findById(req.query.propertyId)
        .exec((err, property) => {

            if (err) return next(err);
            if (!property) return res.status(404).json({message: 'can\'t find any property by provided id'});
            if (property.owner == req.query.userId)
                return res.status(200).json({relatioship: 'owner'});
            if (property.employees.includes(req.query.userId))
                return res.status(200).json({relationship: 'employee'});
            
            res.status(200).json({relationship: false});
        });
});

//------------------------------------------------------------------------
// Exports
module.exports = relationshipsRouter;