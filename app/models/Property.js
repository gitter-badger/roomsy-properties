var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//------------------------------------------------------------------------
// Reference Schema

//------------------------------------------------------------------------
// Validator
// var validator = Utils.getValidator('booking');

//------------------------------------------------------------------------
// Schema definition
var propertySchema = mongoose.Schema({

    region          : { type: String, required: true, default: 'North America' },
    pricingPlan     : { type: String, required: true, default: 'Basic' },

    //========================================================================
    accountId       : { type: mongoose.Schema.Types.ObjectId, required: true }
}, 
//Schema optioms
{
	timestamps: true
});

//------------------------------------------------------------------------
// Schema Methods 

//------------------------------------------------------------------------
// Exports
module.exports = {
    Schema: propertySchema,
    Model: mongoose.model('Property', propertySchema)
}