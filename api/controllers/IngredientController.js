'use strict';

var mongoose = require('mongoose'), //the require() method means that we will use the set of functions from a specified node module.
    Ingredient = mongoose.model('Ingredients'); //data model made from the IngredientSchema


//Below, we are building the four controller functions that we referenced in the subWaylandRoutes.js file

//The first two functions are for the /ingredients route, the last two are for the /ingredients/:ingredientID route
//(we need to be able to access all of the ingredients as well as just one specific ingredient)

//Each of these functions uses a different mongoose method: find(), save(), findById(), or findOneAndUpdate().

exports.get_ingredients = function (req, res) { //this function will give us a list of ALL of the ingredients (ham, provolone, ciabatta, etc.)
    Ingredient.find({} , function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient)

    });
};

exports.add_ingredient = function (req, res) { //this function will allow us to add an ingredient to the list, which we will need initially.
    var new_ingredient = new Ingredient(req.body); //make a new Ingredient
    new_ingredient.save(function (err, ingredient) { //use the mongoose save method to save the ingredient
        if (err)
            res.send(err);
        res.json(ingredient)

    });
};

exports.get_ingredient = function (req, res) { //this function will give us an individual ingredient (specified by an Id that mongoose generates).
    Ingredient.findById(req.params.ingredientID, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient)

    });
};

exports.update_ingredient = function (req, res) { //this will allow us to update an ingredient, which will be particularly useful when we need to say that it's not available.
    Ingredient.findOneAndUpdate({_id: req.params.ingredientID}, req.body, {new: true}, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient);
    })
};

exports.delete_ingredient = function(req, res) {
    Ingredient.deleteOne({
        _id: req.params.ingredientID
    }, function(err, ingredient) {
        if (err)
            res.send(err);
        res.json({ message: 'Ingredient successfully deleted!' });
    });
};