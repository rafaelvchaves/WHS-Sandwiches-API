var seeder = require('mongoose-seed');

seeder.connect('mongodb://localhost/subWaylandDB', function () {

    seeder.loadModels([
        '../api/models/subWaylandModel.js'
    ]);

    seeder.clearModels(['Orders']);
});