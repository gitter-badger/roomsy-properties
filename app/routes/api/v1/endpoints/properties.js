var express = require('express');
var propertiesRouter = express.Router();

//------------------------------------------------------------------------
// Models
var Property = Utils.getModel('Property');

//------------------------------------------------------------------------
// Configurations
var auth = Utils.getConfig('authentication');

//------------------------------------------------------------------------
// API paths
propertiesRouter.get('/', auth.verifyAuthorization, (req, res, next) => {
    
    var authInfo = req.authInfo;

    Property
        .find({accountId: authInfo.account._id})
        .exec((err, properties) => {

            if (err) return next(err);
            
            res.status(200).json({status: 200, message: 'ok', results: {count: properties.length, properties: properties}});
        });
})

propertiesRouter.post('/', auth.verifyAuthorization, (req, res, next) => {

    var authInfo = req.authInfo;

    var property = new Property({
        name: req.body.name,
        region: req.body.region,
        pricingPlan: req.body.pricingPlan,
        accountId: authInfo.account._id
    });

    property.save((err) => {

        if (err) return next(err);
        res.status(200).json({status: 200, message: 'ok', result: {propertyId: property._id}});
    });
});

//------------------------------------------------------------------------
// Exports
module.exports = propertiesRouter;