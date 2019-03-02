var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Ingredient = require('./api/models/subWaylandModel'), //our models
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/subWaylandDB', { useNewUrlParser: true }); //connect to the database (subWaylandDB)

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/subWaylandRoutes'); //imported as function with app parameter
routes(app); //register the routes for this application


app.listen(port); //port 3000

console.log('subWayland RESTful API server started on: '+ port);
module.exports = app;