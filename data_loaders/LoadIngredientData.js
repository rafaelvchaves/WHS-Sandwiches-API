var seeder = require('mongoose-seed');
var ObjectId = require('mongodb').ObjectId;
var mongo_uri = process.env['MONGODB_URI'];
if (mongo_uri === undefined) {
    mongo_uri = 'mongodb://localhost/subWaylandDB'
}

// Connect to the MongoDB database via Mongoose.
seeder.connect(mongo_uri, function () {

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

// Create ingredient type IDs and hold on to them so that they can be referenced in the ingredients collection.
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
                'minimum': 1,
                'maximum': 1
            },
            {
                '_id': meat_id,
                'name': 'Meat',
                'minimum': 0,
                'maximum': 3
            },
            {
                '_id': cheese_id,
                'name': 'Cheese',
                'minimum': 0,
                'maximum': 2
            },
            {
                '_id': toppings_id,
                'name': 'Toppings',
                'minimum': 0,
                'maximum': 5
            },
            {
                '_id': sauce_id,
                'name': 'Sauce',
                'minimum': 0,
                'maximum': 2
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
                'ingredient_type_id': bread_id,
                'name': 'White',
                'is_available': true
            },
            {
                'ingredient_type_id': bread_id,
                'name': 'Spinach Wrap',
                'is_available': true
            },
            {
                'ingredient_type_id': bread_id,
                'name': 'Tomato Wrap',
                'is_available': true
            },
            {
                'ingredient_type_id': bread_id,
                'name': 'Wheat Wrap',
                'is_available': true
            },
            {
                'ingredient_type_id': meat_id,
                'name': 'Ham',
                'is_available': true
            },
            {
                'ingredient_type_id': meat_id,
                'name': 'Turkey',
                'is_available': true
            },
            {
                'ingredient_type_id': meat_id,
                'name': 'Roast Beef',
                'is_available': true
            },
            {
                'ingredient_type_id': meat_id,
                'name': 'Buffalo Chicken',
                'is_available': true
            },
            {
                'ingredient_type_id': cheese_id,
                'name': 'Provolone',
                'is_available': true
            },
            {
                'ingredient_type_id': cheese_id,
                'name': 'American',
                'is_available': true
            },            {
                'ingredient_type_id': cheese_id,
                'name': 'Cheddar',
                'is_available': true
            },            {
                'ingredient_type_id': cheese_id,
                'name': 'Swiss',
                'is_available': true
            },
            {
                'ingredient_type_id': cheese_id,
                'name': 'Pepper Jack',
                'is_available': true
            },
            {
                'ingredient_type_id': toppings_id,
                'name': 'Lettuce',
                'is_available': true
            },
            {
                'ingredient_type_id': toppings_id,
                'name': 'Jalapeños',
                'is_available': true
            },
            {
                'ingredient_type_id': toppings_id,
                'name': 'Tomatoes',
                'is_available': true
            },
            {
                'ingredient_type_id': toppings_id,
                'name': 'Pickles',
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