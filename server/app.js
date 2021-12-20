var express = require('express');
var path = require('path');

require('./src/database');

var app = express();

//Archivos rutas
var meeting_routes = require('./src/routes/meeting');
var post_routes = require('./src/routes/post');
var user_routes = require('./src/routes/user');

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
app.use('/meeting', meeting_routes);
app.use('/user', user_routes);

const CLIENT_BUILD_PATH = path.join(__dirname, "..", "client", "build");

//Static files
app.use(express.static(CLIENT_BUILD_PATH));

//Server React Client
app.get("*", function(req, res) {
    res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
});

module.exports = app;
