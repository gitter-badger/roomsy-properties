//------------------------------------------------------------------------
// Exports
module.exports = {
    verifyAPIKey: function(req, res, next) {
        var apiKey = Configs.apiKey;
        if (req.query.apikey !== apiKey && req.body.apikey !== apiKey)
            return res.status(401).json({status: 401, message: 'invalid api-key'});
        next();
    }
}