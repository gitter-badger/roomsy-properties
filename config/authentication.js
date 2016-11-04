//------------------------------------------------------------------------
// Exports
module.exports = {
    verifyAPIKey: function(req, res, next) {
        var apiKey = Utils.getSecret().apiKey;
        if (req.query.apikey !== apiKey && req.body.apikey !== apiKey)
            return res.status(401).json({status: 401, message: 'invalid api-key'});
        next();
    },
    verifyAuthorization: function(req, res, next) {

        var principle = req.headers.principle;

        if (!principle) {
            console.log(req.headers)
            if (req.headers.authorization)
                res.status(403).json({status: 403, message: 'unresolved token'});
            else
                res.status(401).json({status: 401, message: 'un-authenticated'});

            return;
        }
        
        try {
            req.authInfo = JSON.parse(Buffer.from(principle, 'base64').toString('utf8'));
            next();
        }
        catch(err) {
            
            next(err.toString());
        }  
    }
}