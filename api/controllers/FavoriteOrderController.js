'use strict';
var mongoose = require('mongoose');
var FavoriteOrder = mongoose.model('FavoriteOrders');

// Gets list of all orders.
exports.get_favorite_orders = function (req, res) {
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
    FavoriteOrder.find(filter, [], {sort: sort}, function (err, favorite_order) {
        if (err)
            res.send(err);
        res.json(favorite_order)

    });
};

// Adds an order to the list (will be done by the user).
exports.add_favorite_order = function (req, res) {
    var new_favorite_order = new FavoriteOrder(req.body);
    new_favorite_order.save(function (err, favorite_order) {
        if (err)
            res.send(err);
        res.json(favorite_order)

    });
};

// Gets one order.
exports.get_favorite_order = function (req, res) {
    FavoriteOrder.findById(req.params.favoriteOrderID, function (err, favorite_order) {
        if (err)
            res.send(err);
        res.json(favorite_order)

    });
};

// Updates an order (if someone wants to cancel their order).
exports.update_favorite_order = function (req, res) {
    FavoriteOrder.findOneAndUpdate({_id: req.params.favoriteOrderID}, req.body, {new: true}, function (err, favorite_order) {
        if (err)
            res.send(err);
        res.json(favorite_order);
    })
};

// Deletes a favorite.
exports.delete_favorite_order = function (req, res) {
    FavoriteOrder.deleteOne({
        _id: req.params.favoriteOrderID
    }, function (err) {
        if (err)
            res.send(err);
        res.json({message: 'Favorite Order successfully deleted!'});
    });
};
