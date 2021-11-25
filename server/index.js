//  index.js

const express = require('express');

var app = require('./app');

const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

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
};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

// app.listen(port, () => {
//     console.log('Server listening on port: ' + port);
// });

// const app = express();

// // Routes
// const postRouter = require('./src/routes/post.router');
// const datetimesRouter = require('./src/routes/datetimes.router');

// require('./src/database');
// const path = require('path');

// app.use(
//   express.urlencoded({
//     extended: true
//   })
// );
// app.use(express.json());
// app.use('/posts', postRouter);
// app.use('/datetimes',datetimesRouter);

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`)
// });

// // will redirect all the non-api routes to react frontend
// app.use(function(req, res) {
//     res.sendFile(path.join(__dirname, '../client','build','index.html'));
// });

// const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

// // Static files
// app.use(express.static(CLIENT_BUILD_PATH));

// // Server React Client
// app.get("/", function(req, res) {
//   res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
// });
