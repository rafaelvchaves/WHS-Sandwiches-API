'use strict';

//Routes: how an application will respond to a client request for a specific endpoint,
//which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

module.exports = function (app) /*means that the file will be exported as a function. We reference this as a var in the server.js when we write
                                "var routes = require('./api/routes/subWaylandRoutes')" */
{
    //these three require() calls allow us to use the functions we built in the three controller folders.
    var IngredientTypeController = require('../controllers/IngredientTypeController'); //the controllers are basically modules that we made I think
    var IngredientController = require('../controllers/IngredientController');
    var OrderController = require('../controllers/OrderController');

//.get, .put, .post, and .delete: 4 http methods/verbs
//Under each of these routes, we define the different verbs supported on that route, and we assign a controller function to each of them.

    app.route('/ingredient_types')
        .get(IngredientTypeController.get_ingredient_types) //Whenever a request comes to the /ingredient_types path with the HTTP method GET,
                                                            //the controller function "get_ingredient_types" must be called to handle the request.
        .post(IngredientTypeController.add_ingredient_type);
    app.route('/ingredient_types/:ingredientTypeID')
        .get(IngredientTypeController.get_ingredient_type)
        .put(IngredientTypeController.update_ingredient_type);

    app.route('/ingredients')
        .get(IngredientController.get_ingredients)
        .post(IngredientController.add_ingredient);
    app.route('/ingredients/:ingredientID')
        .get(IngredientController.get_ingredient)
        .put(IngredientController.update_ingredient);

    app.route('/orders')
        .get(OrderController.get_orders)
        .post(OrderController.add_order);
    app.route('/orders/:orderID')
        .get(OrderController.get_order)
        .put(OrderController.update_order);
};
