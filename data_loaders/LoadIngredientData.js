var seeder = require('mongoose-seed');
var ObjectId = require('mongodb').ObjectId;

// Connect to the MongoDB database via Mongoose.
seeder.connect('mongodb://localhost/subWaylandDB', function () {

    // Load Mongoose models.
    seeder.loadModels([
        '../api/models/subWaylandModel.js'
    ]);

    // Clear specified collections beforehand.
    seeder.clearModels(['IngredientTypes', 'Ingredients'], function () {

        // Callback to populate DB once collections have been cleared.
        seeder.populateModels(data, function () {
            console.log('Seeded');
            seeder.disconnect();
        });

    });
});

// Hold on to ingredient type IDs so that they can be referenced in the ingredients documents.
bread_id = ObjectId();
meat_id = ObjectId();
cheese_id = ObjectId();
toppings_id = ObjectId();
sauce_id = ObjectId();

// Data array containing seed data - documents organized by Models.
var data = [

    {
        'model': 'IngredientTypes',
        'documents': [
            {
                '_id': bread_id,
                'name': 'Bread',
                'limit': 1
            },
            {
                '_id': meat_id,
                'name': 'Meat',
                'limit': 3
            },
            {
                '_id': cheese_id,
                'name': 'Cheese',
                'limit': 2
            },
            {
                '_id': toppings_id,
                'name': 'Toppings',
                'limit': 5
            },
            {
                '_id': sauce_id,
                'name': 'Sauce',
                'limit': 2
            }
        ]
    },

    {
        'model': 'Ingredients',
        'documents': [
            {
                'ingredient_type_id': bread_id,
                'name': 'Ciabatta',
                'is_available': true
            },
            {
                'ingredient_type_id': bread_id,
                'name': 'Wheat',
                'is_available': true
            },
            {
                'ingredient_type_id': cheese_id,
                'name': 'White',
                'is_available': true
            },
            {
                'ingredient_type_id': meat_id,
                'name': 'Ham',
                'is_available': true
            },
            {
                'ingredient_type_id': cheese_id,
                'name': 'Provolone',
                'is_available': true
            },
            {
                'ingredient_type_id': toppings_id,
                'name': 'Lettuce',
                'is_available': true
            },
            {
                'ingredient_type_id': sauce_id,
                'name': 'Mayonnaise',
                'is_available': true
            }
        ]
    }
];