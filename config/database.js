var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Use native ES6 Promise instead of Mongoose's default


//------------------------------------------------------------------------
// Exports
module.exports = {

	//Methods
	connect: function(callback) {
		
		mongoose.connect(Configs.databaseUrl, function(err) {

            if (err) {
            	console.error('Can\'t connect to MongoDB with provided connectionString');
            	return callback(err);
            }

            console.log('MongoDB Connected');
            callback();
        });
	}
}