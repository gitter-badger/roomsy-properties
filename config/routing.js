var express = require('express');

//------------------------------------------------------------------------
var apiRouter = Utils.getRouter('api');

//------------------------------------------------------------------------
var appRouter = express.Router();
appRouter.use('/api', apiRouter);

//------------------------------------------------------------------------
var configObject = {
	
	appRouter: appRouter
}

//------------------------------------------------------------------------
module.exports =  configObject;