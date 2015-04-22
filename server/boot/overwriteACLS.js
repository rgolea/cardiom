var fs = require('fs');
var path = require('path');
module.exports = function (app) {
    var modelNames = Object.keys(app.models);

    var modelFolder = './common/models/';
    fs.readdir(modelFolder, function (err, list) {
        if (err) {
            console.log(err);
        };

        var models = [];
        
        list.forEach(function (file) {
            if (file.indexOf('.json')!==-1) {
                var jsonFile = require('../../common/models/'+file);

                modelNames.forEach(function (m) {
                    var model = app.models[m];
                    if(jsonFile.name == model.modelName && model.settings.overwriteACLS){
                        model.settings.acls = [];
                        jsonFile.acls.forEach(function (r) {
                            model.settings.acls.push(r);
                        });
                    };
                });


            }

        });
    });

};