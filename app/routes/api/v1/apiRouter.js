var express     = require('express');
var apiRouter   = express.Router();

//------------------------------------------------------------------------
// API endpoints
var propertiesRouter    = require('./endpoints/properties');
var relationshipsRouter = require('./endpoints/relationships');

//------------------------------------------------------------------------
// Mount API endpoints on router
apiRouter.use('/properties', propertiesRouter);
apiRouter.use('/relationships', relationshipsRouter);

//------------------------------------------------------------------------
// Exports
module.exports = apiRouter;