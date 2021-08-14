//  index.js

const express = require('express');
const PORT = 8080;
const app = express();

// Routes
const postRouter = require('./src/routes/post.router');
const datetimesRouter = require('./src/routes/datetimes.router');

require('./src/database');
const path = require('path');

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use('/posts', postRouter);
app.use('/datetimes',datetimesRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

// will redirect all the non-api routes to react frontend
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../client','build','index.html'));
});

const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

// Server React Client
app.get("/", function(req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
});
