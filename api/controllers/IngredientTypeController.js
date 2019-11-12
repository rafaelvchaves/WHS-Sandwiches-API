'use strict';
var mongoose = require('mongoose'),
    IngredientType = mongoose.model('IngredientTypes');

exports.get_ingredient_types = function (req, res) {
    IngredientType.find({}, [], {
        sort: {
            _id: 1
        }
    }, function (err, ingredient_type) {
        if (err)
            res.send(err);
        res.json(ingredient_type)

    });
};

exports.add_ingredient_type = function (req, res) {
    var new_ingredient_type = new IngredientType(req.body);
    new_ingredient_type.save(function (err, ingredient_type) {
        if (err)
            res.send(err);
        res.json(ingredient_type)

    });
};

exports.get_ingredient_type = function (req, res) {
    IngredientType.findById(req.params.ingredientTypeID, function (err, ingredient_type) {
        if (err)
            res.send(err);
        res.json(ingredient_type)

    });
};

exports.update_ingredient_type = function (req, res) {
    IngredientType.findOneAndUpdate({_id: req.params.ingredientTypeID}, req.body, {new: true}, function (err, ingredient_type) {
        if (err)
            res.send(err);
        res.json(ingredient_type);
    })
};

exports.delete_ingredient_type = function (req, res) {
    IngredientType.deleteOne({
        _id: req.params.ingredientTypeID
    }, function (err, ingredient_type) {
        if (err)
            res.send(err);
        res.json({message: 'Ingredient type successfully deleted!'});
    });
};