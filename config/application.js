//------------------------------------------------------------------------
// Node dependencies
var path = require('path');
var http = require('http');

//------------------------------------------------------------------------
// External dependencies
var express         = require('express');
var bodyParser      = require('body-parser');
var morgan          = require('morgan');

//------------------------------------------------------------------------
// Express app
var app = express();

//------------------------------------------------------------------------
// Basic configurations
global.Utils = require('./utilities');
global.App = {
    eapp:    app,
    env:    process.env.NODE_ENV || 'production',
    port:   process.env.PORT || 1337
}

//------------------------------------------------------------------------
// App configurations
App.database        = Utils.getConfig('database');
App.routing         = Utils.getConfig('routing');
App.errorHandling   = Utils.getConfig('errorHandling');
App.authentication  = Utils.getConfig('authentication');

//------------------------------------------------------------------------
//Express Middlewares stack
app.use(morgan('dev'));
app.use(express.static(path.join(Utils.root_path, 'public', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(App.authentication.verifyAPIKey);
/*app.use(validator());*/
app.use(App.routing.appRouter);
app.use(App.errorHandling.handler);

//------------------------------------------------------------------------
// Exports
module.exports = {

    start: function() {
        App.database.connect((err) => {
            if (!err) {
                http.createServer(app).listen(App.port, () => {
                    console.log('Server listening on port ' + App.port);
                });
            }
        });
    }
};



