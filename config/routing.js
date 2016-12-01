var express = require('express');

//------------------------------------------------------------------------
var apiRouter = Utils.getRouter('api');

//------------------------------------------------------------------------
var appRouter = express.Router();
appRouter.use('/api', apiRouter);
appRouter.get('/', (req, res) => {res.end('roomsy-properties is online')});

//------------------------------------------------------------------------
var configObject = {
	
	appRouter: appRouter
};

//------------------------------------------------------------------------
module.exports =  configObject;