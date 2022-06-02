//  index.js

const express = require('express');

var app = require('./app');

const http = require('http');

const httpServer = http.createServer(app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80!');
});

