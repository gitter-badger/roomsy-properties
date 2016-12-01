var request = require('request');

var endpoint = {
    hostname: 'roomsy-relations.herokuapp.com'
}


module.exports = {

    createOwnedProperty: function(ownerId, propertyId, callback) {

        var requestOptions = {
            hostname: endpoint.hostname,
            path: '/users/' + ownerId + '/ownedproperties',
            method: 'POST',
            json: true,
            body: {
                property: propertyId,
                owner: ownerId
            }
        };

        request(requestOptions, function(error, response, body) {
            
            if (error)
                return callback(error);
            
            // response.body = body;
            if (!error && response.statusCode === 200)
                callback(null, body);
        });
    }
}