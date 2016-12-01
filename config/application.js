//------------------------------------------------------------------------
// Node dependencies
var path = require('path');
var http = require('http');

//------------------------------------------------------------------------
// External dependencies
var express             = require('express');
var bodyParser          = require('body-parser');
var morgan              = require('morgan');
var expressValidator    = require('express-validator');

//------------------------------------------------------------------------
// Configurations
global.Utils = require('./utilities');
global.Configs = {
    env             : process.env.NODE_ENV,
    port            : process.env.PORT,
    apiKey          : process.env.API_KEY,
    databaseUrl     : process.env.DATABASE_URL
};
global.App = {
    expressApp      : express(),
    database         : Utils.getConfig('database'),
    routing         : Utils.getConfig('routing'),
    errorHandling   : Utils.getConfig('errorHandling'),
    authentication  : Utils.getConfig('authentication'),
    validation      : Utils.getConfig('validation')
};

//------------------------------------------------------------------------
//Express Middlewares stack
var app = App.expressApp;
app.use(morgan('dev'));
app.use(express.static(path.join(Utils.root_path, 'public', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator(App.validation));
app.use(App.authentication.verifyAPIKey);
app.use(App.routing.appRouter);
app.use(App.errorHandling.handler);

//------------------------------------------------------------------------
// Exports
module.exports = {

    start: function() {
        App.database.connect((err) => {
            if (err) return;

            http.createServer(App.expressApp).listen(Configs.port, () => {
                console.log('Server listening on port ' + Configs.port);
            });
        });
    }
};



