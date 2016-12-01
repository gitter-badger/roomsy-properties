var express = require('express');

//------------------------------------------------------------------------
var apiRouter = Utils.getRouter('api');
var auth = Utils.getConfig('authentication');

//------------------------------------------------------------------------
var appRouter = express.Router();
appRouter.use('/api', auth.authenticate, apiRouter);

//------------------------------------------------------------------------
var configObject = {
	
	appRouter: appRouter
}

//------------------------------------------------------------------------
module.exports =  configObject;