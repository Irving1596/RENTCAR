const express = require('express');
const routerCliente = new express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar_campos');
const clientes = require('../../controllers/cliente.js');
const { validarJWT } = require('../../middlewares/validar-jwt');



/**
 * SE CREA LA CUENTA DE USUARIO
 */
routerCliente.post('/crearCuenta', [
        check('USUARIO', 'El nombre de USUARIO es obligatorio').not().isEmpty(),
        check('PASSWORD', 'La CONTRASENA es obligatoria').not().isEmpty(),
        check('NOMBRE', 'El NOMBRE es obligatorio').not().isEmpty(),
        check('APELLIDO', 'EL APELLIDO es obligatorio').not().isEmpty(),
        check('CORREO', 'El email es obligatorio').not().isEmpty(),
        check('CORREO', 'El email ingresado no es valido').isEmail(),
    ], validarCampos,
    clientes.crearCuenta);

/**
 * LOGIN 
 *  */
routerCliente.post('/login', [
        check('USUARIO', 'El usuario es obligatorio').not().isEmpty(),
        check('PASSWORD', 'La contraseña es obligatoria').not().isEmpty(),
    ], validarCampos,
    clientes.login);

/**
 * MI PERFIL 
 *  */
routerCliente.get('/miPerfil', [
        check('USUARIO', 'El usuario es obligatorio').not().isEmpty(),
    ], validarCampos,
    validarJWT,
    clientes.miPerfil);

/**
 * HISTORIAL DE ALQUILER 
 *  */
routerCliente.get('/miHistorialAlquiler',
    validarJWT,
    clientes.historialAlquiler);

module.exports = routerCliente;