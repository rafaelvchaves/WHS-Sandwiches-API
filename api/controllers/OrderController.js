'use strict';
var mongoose = require('mongoose'), //the require() method means that we will use the set of functions from a specified node module.
    Order = mongoose.model('Orders'); //the data model that is made from the OrderSchema (look in subWaylandModel.js)

exports.get_orders = function (req, res) {
    Order.find({}, function (err, ingredient) {
        if (err)
            res.send(err);
        res.json(ingredient)

    });
};

exports.add_order = function (req, res) {
    var new_order = new Order(req.body);
    new_order.save(function (err, order) {
        if (err)
            res.send(err);
        res.json(order)

    });
};

exports.get_order = function (req, res) {
    Order.findById(req.params.orderID, function (err, order) {
        if (err)
            res.send(err);
        res.json(order)

    });
};
exports.update_order = function (req, res) {
    Order.findOneAndUpdate({_id: req.params.orderID}, req.body, {new: true}, function (err, order) {
        if (err)
            res.send(err);
        res.json(order);
    })
};
