'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Database is comprised of three collections: IngredientTypes, Ingredients, and Orders.
// Each collection is comprised of documents, which are structured by Schemas.

// Each ingredient type has a name (e.g. bread, meat) and a limit (1 for bread, 3 for meat, etc).
var IngredientTypeSchema = new Schema({
    name: {
        type: String,
        required: 'Enter the type of ingredient'
    },
    minimum: {
        type: Number,
        required: 'Enter the minimum of this ingredient type'
    },
    maximum: {
        type: Number,
        required: 'Enter the maximum of this ingredient type'
    }
});

// Each ingredient will have a name (e.g. ciabatta, turkey), an availability boolean, and an ingredient type ID reference so we know its ingredient type.
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

// Each order will have a date, a student email/name, an is_favorite boolean, an array of Ingredients, a lunch (1st, 2nd, 3rd), and a boolean if the order is cancelled.
var OrderSchema = new Schema({
    order_date: {
        type: Date,
        default: new Date(),
        required: 'Enter the date of order'
    },
    pickup_date:{
        type: Date,
        default: new Date(),
        required: 'Enter the pickup date of order'
    },
    student_email: {
        type: String,
        required: 'Enter the student email'
    },
    ingredients: {
        type: [IngredientSchema],
        default: undefined, // By default, the array was simply empty, which wasn't recognized as an error.
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

var FavoriteOrderSchema = new Schema({
    student_email: {
        type: String,
        required: 'Enter the student email'
    },
    ingredients: {
        type: [IngredientSchema],
        default: undefined,
        required: 'Add ingredients to this favorite order'
    },
    favorite_name: {
        type: String,
        default: null
    }
});

// The .model() function makes a copy of the schema so it can be used elsewhere.
module.exports = mongoose.model('Ingredients', IngredientSchema);
module.exports = mongoose.model('Orders', OrderSchema);
module.exports = mongoose.model('FavoriteOrders', FavoriteOrderSchema);
module.exports = mongoose.model('IngredientTypes', IngredientTypeSchema);