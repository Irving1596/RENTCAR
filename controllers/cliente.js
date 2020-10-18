const usuario = require('../db_apis/usuario.js');
const bcrypt = require('bcryptjs');
const controller = {};

controller.crearCuenta = async function post(req, res, next) {


    try {


        let usuarios = getUsuariosBody(req);
        const existe_usuario = await usuario.find_existeusuario(usuarios);

        if (existe_usuario.data != '') {
            return res.status(404).json({
                OK: false,
                MSG: 'usuario ya existe'
            })
        }
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        console.log("usuarios", usuarios);
        usuarios.contrasena = bcrypt.hashSync(usuarios.contrasena, salt);

        usuarios = await usuario.crear_usuario(usuarios);
        console.log(usuarios);
        res.status(201).json(usuarios);

    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = controller;