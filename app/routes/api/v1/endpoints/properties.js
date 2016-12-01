var async = require('async');
var express = require('express');
var propertiesRouter = express.Router();

//------------------------------------------------------------------------
// Models
var Property = Utils.getModel('Property');

//------------------------------------------------------------------------
// Validator
var propertiesValidator = Utils.getValidator('properties');

//------------------------------------------------------------------------
// API paths

/**
 * Get user associated properties
 * @param {object} req.query
 * @param {id} req.query.userId
 */
propertiesRouter.get('/', (req, res, next) => {

    var validationErrors = propertiesValidator.validateGetAssociatedPropertiesParams(req.query);
    if (validationErrors.length !== 0) return res.status(400).json({message: 'validation error', error: validationErrors});

    Property
        .find({
            $or: [
                { owner: req.query.userId },
                { employees: req.query.userId }
            ]
        })
        .exec((err, properties) => {  
            
            if (err) return next(err);
            if (!properties || properties.length === 0) return res.status(404).json({message: 'can\'t find any properties with associated user'});
            res.status(200).json({properties: properties});
        });
});

/**
 * Create new property
 * @param {object} req.body
 * @param {id} req.body.userId
 * @param {object} req.body.propertyParams
 */
propertiesRouter.post('/', (req, res, next) => {

    var property = new Property(req.body);
    property.save((err) => {

        if (err) return next(err);
        res.status(200).json({propertyId: property._id});
    });
});

/**
 * Get relationship with a user
 * @param {object} req.body
 * @param {id} req.body.userId
 * @param {object} req.body.propertyParams
 */
propertiesRouter.get('/:propertyId/user/:userId/relationship', (req, res, next) => {
    Property
        .findById(req.params.propertyId)
        .exec((err, property) => {

            if (err) return next(err);
            if (!property) return res.status(404).json({message: 'can\'t find any property by provided id'});
            if (property.owner == req.params.userId)
                return res.status(200).json({relatioship: 'owner'});
            if (property.employees.includes(req.params.userId))
                return res.status(200).json({relationship: 'employee'});
            
            res.status(200).json({relationship: false});
        });
});

//------------------------------------------------------------------------
// Exports
module.exports = propertiesRouter;