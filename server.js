var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Ingredient = require('./api/models/subWaylandModel'), //our models
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/SubWaylandDB', { useNewUrlParser: true }); //connect to the DB

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/subWaylandRoutes'); //grab the routes
routes(app);


app.listen(port);

console.log('subWayland RESTful API server started on: '+ port);
module.exports = app;