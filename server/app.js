var express = require('express');
var path = require('path');

require('./src/database');

var app = express();

//Archivos rutas
var datetimes_routes = require('./src/routes/datetimes');
var post_routes = require('./src/routes/post');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.use('/posts', post_routes);
app.use('/datetimes', datetimes_routes);

//will redirect all the non-api routes to react frontend
//app.use(function(req, res) {
//    res.sendFile(path.join(__dirname,"..","client","build","index.html"));
//});

const CLIENT_BUILD_PATH = path.join(__dirname, "..", "client", "build");

//Static files
app.use(express.static(CLIENT_BUILD_PATH));

//Server React Client
app.get("*", function(req, res) {
    res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
});

module.exports = app;
