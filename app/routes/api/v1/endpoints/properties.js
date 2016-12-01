var async = require('async');
var express = require('express');
var propertiesRouter = express.Router();

//------------------------------------------------------------------------
// Models
var Property = Utils.getModel('Property');

//------------------------------------------------------------------------
// Validator
var validator = Utils.getValidator('properties');

//------------------------------------------------------------------------
// API paths

// Get properties
propertiesRouter.get('/', validator.validateGetRequest, (req, res, next) => {

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

// Create new properties
propertiesRouter.post('/', validator.validatePostRequest, (req, res, next) => {

    var property = new Property(req.body);
    property.save((err) => {

        if (err) return next(err);
        res.status(200).json({propertyId: property._id});
    });
});

/**
 * Update property
 */
propertiesRouter.put('/:propertyId', validator.validatePutRequest, (req, res, next) => {
    Property
        .findById(req.params.propertyId)
        .exec((err, property) => {
            
            if (err) return next(err);
            if (!property) return res.status(404).json({message: 'can\'t find any property by provided id'});
            
            Object.assign(property, req.body);
            property.save((err) => { 
                if (err) return next(err);
                res.status(200).json({propertyId: property._id});
            });
        });
});

/**
 * Get relationship with a user
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