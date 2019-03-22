'use strict';
var mongoose = require('mongoose');
var Order = mongoose.model('Orders');

// Gets list of all orders.
exports.get_orders = function (req, res) {

    var filter = {};
    var sort = {};
    for (var param in req.query) {
        if (param === "daysOfOrders") {
            var today = new Date();
            var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - req.query["daysOfOrders"]);
            filter["date"] = { $gt: lastWeek }
        }
        else if (param === "sort") {
            sort = req.query["sort"]
        }
        else {
            filter[param] = req.query[param]
        }
    }
    Order.find(filter, [], {sort: sort}, function (err, order) {
        if (err)
            res.send(err);
        res.json(order)

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
