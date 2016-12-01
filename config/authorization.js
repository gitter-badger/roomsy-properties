//------------------------------------------------------------------------
// Exports
module.exports = {
    
    verifyAuthorization: function(req, res, next) {

        var principle = req.headers.principle;

        if (!principle) {

            if (req.headers.authorization)
                res.status(403).json({status: 403, message: 'unresolved token'});
            else
                res.status(401).json({status: 401, message: 'un-authenticated'});

            return;
        }
        
        try {
            var parsedPrinciple = JSON.parse(Buffer.from(principle, 'base64').toString('utf8'));
            req.auth = {
                account: parsedPrinciple.account
            };
            next();
        }
        catch(err) {
            
            next(err.toString());
        }  
    }
}