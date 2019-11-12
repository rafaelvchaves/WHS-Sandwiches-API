'use strict';
var mongoose = require('mongoose'),
    Ingredient = mongoose.model('Ingredients');

exports.get_ingredients = function (req, res) {
    var filter = {};
    var sort = {};
    for (var param in req.query) {
        if (param === "sort") {
            sort = req.query["sort"]
        }
        else {
            filter[param] = req.query[param]
        }
    }
    Ingredient.find(filter, [], {sort: sort}, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient)

    });
};

exports.add_ingredient = function (req, res) {
    var new_ingredient = new Ingredient(req.body);
    new_ingredient.save(function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient)

    });
};

exports.get_ingredient = function (req, res) {
    Ingredient.findById(req.params.ingredientID, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient)

    });
};

exports.update_ingredient = function (req, res) {
    Ingredient.findOneAndUpdate({_id: req.params.ingredientID}, req.body, {new: true}, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient);
    })
};

exports.delete_ingredient = function (req, res) {
    Ingredient.deleteOne({
        _id: req.params.ingredientID
    }, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json({message: 'Ingredient successfully deleted!'});
    });
};