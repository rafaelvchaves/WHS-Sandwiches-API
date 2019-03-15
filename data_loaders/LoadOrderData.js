var seeder = require('mongoose-seed');

// Connect to the MongoDB database via Mongoose.
seeder.connect('mongodb://localhost/subWaylandDB', function () {

    // Load Mongoose models.
    seeder.loadModels([
        '../api/models/subWaylandModel.js'
    ]);

    // Clear specified collections beforehand.
    seeder.clearModels(['Orders'], function () {

        // Callback to populate DB once collections have been cleared.
        seeder.populateModels(data, function () {
            console.log('Seeded');
            seeder.disconnect();
        });

    });
});


// Data array containing seed data - documents organized by Models.
var orderIngredients = [
    {
        'model': 'Ingredients',
        'documents': [
            {

            }
        ]
    }
];
var data = [

    {
        'model': 'Orders',
        'documents': [
            {
                'student_email': 'rafaelvchaves@gmail.com',
                'ingredients': orderIngredients,
                'which_lunch': 3,
                'is_favorite': false
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
    }
];
