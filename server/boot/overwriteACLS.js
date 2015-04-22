module.exports = function (app) {
    var modelNames = Object.keys(app.models);
    modelNames.forEach(function (m) {
        var model = app.models[m];
        var config = require('../../common/models/' + model.modelName.toLowerCase() + '.json');
        
        if (model.settings.overwriteACLS) {
                model.settings.acls = [];
                config.acls.forEach(function (r) {
                    model.settings.acls.push(r);
                });
            console.log('done');
        };
    });

};