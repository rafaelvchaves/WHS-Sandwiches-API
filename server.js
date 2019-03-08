var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    models = require('./api/models/subWaylandModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Connect to the database (subWaylandDB).
mongoose.connect('mongodb://localhost/subWaylandDB', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Imported as function with app parameter.
var routes = require('./api/routes/subWaylandRoutes');

// Register the routes.
routes(app);

app.listen(port);
console.log('subWayland RESTful API server started on: ' + port);
module.exports = app;