var mongoose = require('mongoose');

//------------------------------------------------------------------------
// Schema definition
var propertySchema = mongoose.Schema({

    name            : { type: String, required: true },
    numberOfRooms   : { type: Number, required: true },
    region          : { type: String, required: true, default: 'North America' },
    address         : { type: String },
    city            : { type: String },
    postalCode      : { type: String },
    phoneNumber     : { type: String },
    fax             : { type: String },
    email           : { type: String },
    website         : { type: String },

    
    owner           : { type: String, required: true },
    employees       : [
        { type: String, required: true }
    ]
    // _relationship   : { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Relationship' }
});

//------------------------------------------------------------------------
// Schema Methods 

//------------------------------------------------------------------------
// Exports
module.exports = {
    Schema: propertySchema,
    Model: mongoose.model('Property', propertySchema)
};