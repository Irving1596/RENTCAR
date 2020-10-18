const express = require('express');
const routerAutos = new express.Router();
//const participantes = require('../controllers/participante.js');
const autos = require('../../controllers/autos.js');
//const { validarJWT, validarROLDEPTO } = require('../../middlewares/validar-jwt');



//catedras
routerAutos.get('/listAllAutos', autos.getAllAutos);

module.exports = routerAutos;