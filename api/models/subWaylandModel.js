'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        default: undefined,
        required: 'Add ingredients to this order'
    },
    which_lunch: {
        type: Number,
        required: 'Specify which lunch student is taking'
    },
    is_completed: {
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

module.exports = mongoose.model('Ingredients', IngredientSchema);
module.exports = mongoose.model('Orders', OrderSchema);
module.exports = mongoose.model('FavoriteOrders', FavoriteOrderSchema);
module.exports = mongoose.model('IngredientTypes', IngredientTypeSchema);