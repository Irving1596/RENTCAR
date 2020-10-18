const express = require('express');
const app = express();

app.use('/Autos', require('./autos'));

module.exports = app;