var express     = require('express');
var apiRouter   = express.Router();

//------------------------------------------------------------------------
// API endpoints
var propertiesRouter  = require('./endpoints/properties');

//------------------------------------------------------------------------
// Mount API endpoints on router
apiRouter.use('/properties', propertiesRouter);

//------------------------------------------------------------------------
// Exports
module.exports = apiRouter;