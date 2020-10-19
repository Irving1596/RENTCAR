const express = require('express');
const routerAutos = new express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar_campos');
const autos = require('../../controllers/autos.js');
//const { validarJWT, validarROLDEPTO } = require('../../middlewares/validar-jwt');



/**
 * LISTA DE AUTOS DISPONIBLES
 */
routerAutos.get('/listAllAutos', autos.getAllAutos);

/**
 * SE CREAR LA ORDEN DE ALQUILER
 */
routerAutos.post('/crearOrdenAuto', [
        check('USUARIO', 'El ID DEL CLIENTE es obligatorio').not().isEmpty(),
        check('ID_ASUCURSAL', 'EL ID DEL AUTO es obligatorio').not().isEmpty(),
        check('ID_SUCURSAL_RETIRO', 'LA SUCURSAL DE RETIRO es obligatorio').not().isEmpty(),
        check('ID_SUCURSAL_DEVOLUCION', 'LA SUCURSAL DE DEVOLUCION es obligatorio').not().isEmpty(),
        check('FECHA_RETIRO', 'LA FECHA DE RETIRO es obligatorio').not().isEmpty(),
        check('HORA_RETIRO', 'LA HORA DE RETIRO es obligatorio').not().isEmpty(),
        check('FECHA_DEVOLUCION', 'LA FECHA DE RETIRO es obligatorio').not().isEmpty(),
        check('HORA_DEVOLUCION', 'LA HORA DE DEVOLUCION es obligatorio').not().isEmpty()
    ], validarCampos,
    autos.crearOrdenAuto);

module.exports = routerAutos;