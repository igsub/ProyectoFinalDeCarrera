//  index.js

const express = require('express');

var app = require('./app');

const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

if (process.env.NODE_ENV === 'production') {
	const privateKeyPath = path.join(__dirname, '/letsencrypt/live/meet-app.duckdns.org/privkey.pem');
	const certificatePath = path.join(__dirname, '/letsencrypt/live/meet-app.duckdns.org/cert.pem');
	const caPath = path.join(__dirname, '/letsencrypt/live/meet-app.duckdns.org/chain.pem');

	const privateKey = fs.readFileSync(privateKeyPath);
	const certificate = fs.readFileSync(certificatePath);
	const ca = fs.readFileSync(caPath);

	const credentials = {
		key: privateKey,
		cert: certificate,
		ca: ca
	}

	const httpsServer = https.createServer(credentials, app);

	httpsServer.listen(443, () => {
		console.log('HTTPS Server running on port 443');
	});
};

const httpServer = http.createServer(app);

console.log("PORT ENV: ", process.env.NODE_ENV)

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

