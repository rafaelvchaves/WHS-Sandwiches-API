'use strict';

module.exports = function (app) {

    var IngredientTypeController = require('../controllers/IngredientTypeController');
    var IngredientController = require('../controllers/IngredientController');
    var OrderController = require('../controllers/OrderController');
    var FavoriteOrderController = require('../controllers/FavoriteOrderController');

    app.route('/ingredient_types')
        .get(IngredientTypeController.get_ingredient_types)
        .post(IngredientTypeController.add_ingredient_type);
    app.route('/ingredient_types/:ingredientTypeID')
        .get(IngredientTypeController.get_ingredient_type)
        .put(IngredientTypeController.update_ingredient_type)
        .delete(IngredientTypeController.delete_ingredient_type);

    app.route('/ingredients')
        .get(IngredientController.get_ingredients)
        .post(IngredientController.add_ingredient);
    app.route('/ingredients/:ingredientID')
        .get(IngredientController.get_ingredient)
        .put(IngredientController.update_ingredient)
        .delete(IngredientController.delete_ingredient);

    app.route('/orders')
        .get(OrderController.get_orders)
        .post(OrderController.add_order);
    app.route('/orders/:orderID')
        .get(OrderController.get_order)
        .put(OrderController.update_order)
        .delete(OrderController.delete_order);

    app.route('/favorite_orders')
        .get(FavoriteOrderController.get_favorite_orders)
        .post(FavoriteOrderController.add_favorite_order);
    app.route('/favorite_orders/:favoriteOrderID')
        .get(FavoriteOrderController.get_favorite_order)
        .put(FavoriteOrderController.update_favorite_order)
        .delete(FavoriteOrderController.delete_favorite_order);
};
