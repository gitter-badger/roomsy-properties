var path = require('path');

module.exports = {

    root_path: path.join(__dirname, '..'),

    //Functions
    app_path: function(subpath) {
        return path.join(this.root_path, 'app', subpath);  
    },

    getConfig: function(configName) {
        return require(
                path.join(this.root_path, 'config', configName)
            );
    },

    getSecret: function() {
        return require(
            path.join(this.root_path, 'secrets')
        );
    },

    getModel: function(modelName) { //require the model in 'app/models'
        return require(
            this.app_path(
                path.join('models', modelName)
            )).Model;
    },

    getModelSchema: function(modelName) {
        return require(
            this.app_path(
                path.join('models', modelName)
            )).Schema;
    },
    
    getRouter: function(routeName) { //require the route handler in 'app/routes'
        return require(
            this.app_path(
                path.join('routes', routeName)
            ));
    }
}