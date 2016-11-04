var mongoose = require('mongoose');

//------------------------------------------------------------------------
// Options
var connectionString = Utils.getSecret().connectionString;
mongoose.Promise = global.Promise; //Use native ES6 Promise instead of Mongoose's default

//------------------------------------------------------------------------
// Exports
module.exports = {

	//Methods
	connect: function(callback) {

		mongoose.connect(connectionString, function(err) {

            if (err) {
            	console.error('Can\'t connect to MongoDB with provided connectionString');
            	callback(err);
            	return;
            }

            console.log('MongoDB Connected');
            callback();
        });
	}
}