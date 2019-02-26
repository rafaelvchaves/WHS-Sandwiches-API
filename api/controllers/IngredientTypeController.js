'use strict';
var mongoose = require('mongoose'), //the require() method means that we will use the set of functions from a specified node module.
    IngredientType = mongoose.model('IngredientTypes'); //the data model that is made from the IngredientTypeSchema (look in subWaylandModel.js)

//again, we are defining the controller functions referenced in subWaylandRoutes.js by using the mongoose functions find, save, findById, and findOneAndUpdate
//these functions have an identical setup to the IngredientController functions

exports.get_ingredient_types = function (req, res) { //lists all of the ingredient TYPES (bread, meat, cheese, toppings, sauce)
    IngredientType.find({}, function (err, ingredient_type) {
        if (err)
            res.send(err);
        res.json(ingredient_type)

    });
};

exports.add_ingredient_type = function (req, res) { //adds an ingredient type
    var new_ingredient_type = new IngredientType(req.body);
    new_ingredient_type.save(function (err, ingredient_type) {
        if (err)
            res.send(err);
        res.json(ingredient_type)

    });
};

exports.get_ingredient_type = function (req, res) { //gets the type of one ingredient (e.g. bread)
    IngredientType.findById(req.params.ingredientTypeID, function (err, ingredient_type) {
        if (err)
            res.send(err);
        res.json(ingredient_type)

    });
};

exports.update_ingredient_type = function (req, res) { //updates the ingredient type
    IngredientType.findOneAndUpdate({_id: req.params.ingredientTypeID}, req.body, {new: true}, function (err, ingredient_type) {
        if (err)
            res.send(err);
        res.json(ingredient_type);
    })
};