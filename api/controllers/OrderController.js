'use strict';
var mongoose = require('mongoose'),
    Order = mongoose.model('Orders');

// Gets list of all orders.
exports.get_orders = function (req, res) {
    Order.find({}, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient)

    });
};

// Adds an order to the list (will be done by the user).
exports.add_order = function (req, res) {
    var new_order = new Order(req.body);
    new_order.save(function (err, order) {
        if (err)
            res.send(err);
        res.json(order)

    });
};

// Gets one order.
exports.get_order = function (req, res) {
    Order.findById(req.params.orderID, function (err, order) {
        if (err)
            res.send(err);
        res.json(order)

    });
};

// Updates an order (if someone wants to cancel their order).
exports.update_order = function (req, res) {
    Order.findOneAndUpdate({_id: req.params.orderID}, req.body, {new: true}, function (err, order) {
        if (err)
            res.send(err);
        res.json(order);
    })
};

// Deletes an order.
exports.delete_order = function (req, res) {
    Order.deleteOne({
        _id: req.params.orderID
    }, function (err, order) {
        if (err)
            res.send(err);
        res.json({message: 'Order successfully deleted!'});
    });
};
