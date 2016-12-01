var async = require('async');
var express = require('express');
var propertiesRouter = express.Router();

//------------------------------------------------------------------------
// Models
var Property = Utils.getModel('Property');

//------------------------------------------------------------------------
// Configurations
var auth = Utils.getConfig('authentication')
var relationsService = Utils.getService('relations');

//------------------------------------------------------------------------
// API paths

/**
 * Get user associated properties
 * @param {object} req.body
 * @param {id} req.body.userId
 */
propertiesRouter.get('/', (req, res, next) => {

    Property
        .find({owner: req.body.userId})
        .exec((err, property) => {  
            
            if (err) return next(err);
            if (!property) return res.status(404).json({message: 'can\'t find any properties with associated user'});
            res.status(200).json({message: 'ok', property: property});
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
        res.status(200).json({message: 'ok', propertyId: property._id});
    });
});

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