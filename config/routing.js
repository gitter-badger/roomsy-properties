var express = require('express');

//------------------------------------------------------------------------
var apiRouter = Utils.getRouter('api');
var auth = Utils.getConfig('authentication');

//------------------------------------------------------------------------
var appRouter = express.Router();
appRouter.use('/api', apiRouter);

//------------------------------------------------------------------------
var configObject = {
	
	appRouter: appRouter
}

//------------------------------------------------------------------------
module.exports =  configObject;