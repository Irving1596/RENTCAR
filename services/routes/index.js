const express = require('express');
const app = express();

app.use('/Autos', require('./autos'));
app.use('/Clientes', require('./clientes'));


module.exports = app;