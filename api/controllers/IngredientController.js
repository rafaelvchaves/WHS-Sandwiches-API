'use strict';
var mongoose = require('mongoose'), // The require() method means that we are importing the set of functions from a specified node module.
    Ingredient = mongoose.model('Ingredients'); // Data model made from IngredientSchema.


// Below are the controller functions that will handle http requests.
// The first two functions are for accessing the whole ingredient list.
// The remaining three functions are for accessing a single ingredient.
// These functions use mongoose methods: find(), save(), findById(), findOneAndUpdate(), or deleteOne().

// Gets a list of ALL of the ingredients.
exports.get_ingredients = function (req, res) {
    Ingredient.find({}, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient)

    });
};

// Adds an ingredient to the list.
exports.add_ingredient = function (req, res) {
    var new_ingredient = new Ingredient(req.body);
    new_ingredient.save(function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient)

    });
};

// Gets a single ingredient via ID.
exports.get_ingredient = function (req, res) {
    Ingredient.findById(req.params.ingredientID, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient)

    });
};

// Updates an ingredient - particularly useful when we need to indicate that it's not available.
exports.update_ingredient = function (req, res) {
    Ingredient.findOneAndUpdate({_id: req.params.ingredientID}, req.body, {new: true}, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient);
    })
};

// Deletes an ingredient
exports.delete_ingredient = function (req, res) {
    Ingredient.deleteOne({
        _id: req.params.ingredientID
    }, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json({message: 'Ingredient successfully deleted!'});
    });
};