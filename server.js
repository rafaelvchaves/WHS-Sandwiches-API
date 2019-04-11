var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    models = require('./api/models/subWaylandModel'),
    bodyParser = require('body-parser'),
cookieParser = require('cookie-parser');
var serverless = require('serverless-http');

mongoose.Promise = global.Promise;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
});

var mongo_uri = process.env['MONGODB_URI'];
if (mongo_uri === undefined) {
    mongo_uri = 'mongodb://localhost/subWaylandDB'
}

mongoose.connect(mongo_uri, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

var routes = require('./api/routes/subWaylandRoutes');

routes(app);

app.listen(port);
console.log('subWayland RESTful API server started on: ' + port);

// module.exports = app;
module.exports.handler = serverless(app);