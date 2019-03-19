'use strict';

// Routes: how an application will respond to a client request for a specific endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, etc).

// Means that the file will be exported as a function, so that we can register the routes in server.js.
module.exports = function (app) {

    // These three require() calls allow us to use the functions we built in the three controller folders.
    var IngredientTypeController = require('../controllers/IngredientTypeController');
    var IngredientController = require('../controllers/IngredientController');
    var OrderController = require('../controllers/OrderController');
    var FavoriteOrderController = require('../controllers/FavoriteOrderController');

// .get, .put (update), .post (create), and .delete: 4 http methods/verbs
// Under each of these routes, we define the different verbs supported on that route, and we assign a controller function to handle those requests.

// Ingredient Types
    app.route('/ingredient_types')
        .get(IngredientTypeController.get_ingredient_types)
        .post(IngredientTypeController.add_ingredient_type);
    app.route('/ingredient_types/:ingredientTypeID')
        .get(IngredientTypeController.get_ingredient_type)
        .put(IngredientTypeController.update_ingredient_type)
        .delete(IngredientTypeController.delete_ingredient_type);

// Ingredients
    app.route('/ingredients')
        .get(IngredientController.get_ingredients)
        .post(IngredientController.add_ingredient);
    app.route('/ingredients/:ingredientID')
        .get(IngredientController.get_ingredient)
        .put(IngredientController.update_ingredient)
        .delete(IngredientController.delete_ingredient);

// Orders
    app.route('/orders')
        .get(OrderController.get_orders)
        .post(OrderController.add_order);
    app.route('/orders/:orderID')
        .get(OrderController.get_order)
        .put(OrderController.update_order)
        .delete(OrderController.delete_order);

// Favorite Orders
    app.route('/favorite_orders')
        .get(FavoriteOrderController.get_favorite_orders)
        .post(FavoriteOrderController.add_favorite_order);
    app.route('/favorite_orders/:favoriteOrderID')
        .get(FavoriteOrderController.get_favorite_order)
        .delete(FavoriteOrderController.delete_favorite_order);
};
