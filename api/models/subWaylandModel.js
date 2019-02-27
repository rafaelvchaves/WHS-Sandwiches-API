'use strict';

var mongoose = require('mongoose'); //using mongoose again
var Schema = mongoose.Schema;

//Schemas are basically how the data will be organized and laid out.

//Each ingredient type has a name (e.g. bread, meat) and a limit (1 for bread, 3 for meats, etc.)
var IngredientTypeSchema = new Schema({
    name: {
        type: String,
        required: 'Enter the type of ingredient'
    },
    limit: {
        type: Number,
        required: 'Enter the limit on this ingredient'
    }
});

//Each ingredient will have an ID (generated by mongoose), a name (e.g. ciabatta, turkey),
//and a boolean that indicates whether its available.
var IngredientSchema = new Schema({
    ingredient_type_id: {
        type: Schema.Types.ObjectId,
        required: 'Enter the type of ingredient'
    },
    name: {
        type: String,
        required: 'Enter the name of this ingredient'
    },
    is_available: {
        type: Boolean,
        required: 'Specify whether the ingredient is available',
        default: true //by default, set the ingredient to be available
    }

});

var IngredientOrderSchema = new Schema( { //Represents individual ingredients in an order, with an ID and a quantity.
    ingredient_id: {
        type: Schema.Types.ObjectId
    },
    quantity: {
        type: Number
    }
});

//Each order will have a date, student email/name, is_favorite boolean, array of IngredientOrders, a lunch (1st, 2nd, 3rd), and a boolean if the order is cancelled.
var OrderSchema = new Schema({
    date: {
        type: Date,
        required: 'Enter the date of order'
    },
    student_email: {
        type: String,
        required: 'Enter the student email'
    },
    is_favorite: {
        type: Boolean,
        required: 'Specify whether the order is a favorite order',
        default: false
    },
    ingredients: {
        type: [IngredientSchema],
        default: undefined, //by default, the array was simply empty, which wasn't recognized as an error.
        // Defaulting this to undefined means that an error will be thrown if no ingredients are added to an order.
        required: 'Add ingredients to this order'
    },
    which_lunch: {
        type: Number,
        required: 'Specify which lunch student is taking'
    },
    is_cancelled: {
        type: Boolean,
        required: 'Specify whether order is cancelled',
        default: false
    }
});


module.exports = mongoose.model('Ingredients', IngredientSchema); //The .model() function makes a copy of the schema so it can be used elsewhere.
module.exports = mongoose.model('Orders', OrderSchema);
module.exports = mongoose.model('IngredientTypes', IngredientTypeSchema);