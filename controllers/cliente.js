const db = require("../models/init-models.js");
const models = db.initModels(db.sequelize);
const CLIENTES = models.CLIENTES;
const RESERVA = models.RESERVA;
const SUCURSAL = models.SUCURSAL;
const A_SUCURSAL = models.A_SUCURSAL;
const A_FLOTAS = models.A_FLOTAS;
const A_TIPO = models.A_TIPO;
const A_MARCA = models.A_MARCA;
const bcrypt = require('bcrypt');
const { generarJWT, obtenerUsuario } = require('../helpers/jwt')
const Op = db.Sequelize.Op;

const controller = {};

controller.crearCuenta = async function post(req, res, next) {
    try {
        let CLIENTE = getClienteBody(req);
        const salt = bcrypt.genSaltSync();
        CLIENTE.PASSWORD = bcrypt.hashSync(CLIENTE.PASSWORD, salt);
        const NEWCLIENTE = await CLIENTES.findOrCreate({
            where: { // buscamos si existe el usuario o correo
                [Op.or]: [{
                        usuario: CLIENTE.USUARIO
                    },
                    {
                        correo: CLIENTE.CORREO
                    }
                ]
            },
            defaults: CLIENTE // Si el usuario no existe crea el registro con el objeto cliente
        });
        if (!NEWCLIENTE[0]._options.isNewRecord) {
            return res.status(201).json({
                OK: false,
                MSG: 'EL USUARIO O DIRECCION DE CORREO YA EXISTE '
            });
        }
        return res.status(201).json({
            OK: true,
            MSG: 'CUENTA CREADA SATISFACTORIAMENTE',
            DATA: NEWCLIENTE[0].dataValues
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
}
controller.login = async function post(req, res, next) {
    try {
        let login = getLoginBody(req);
        const CLIENTE = await CLIENTES.findOne({ where: { USUARIO: login.USUARIO } })
        if (!CLIENTE) {
            return res.status(404).json({
                OK: false,
                MSG: 'usuario no encontrado'
            })
        }
        // Verificar contraseña
        const validPassword = bcrypt.compareSync(login.PASSWORD, CLIENTE.dataValues.PASSWORD)
        if (!validPassword) {
            return res.status(404).json({
                OK: false,
                MSG: 'contraseña incorrecta'
            })
        }
        //Generar el token
        const token = await generarJWT(CLIENTE.dataValues.ID, CLIENTE.dataValues.USUARIO);
        //Validado
        return res.status(201).json({
            OK: true,
            MSG: 'credenciales correctas',
            USUARIO: CLIENTE.dataValues.USUARIO,
            NOMBRE: CLIENTE.dataValues.NOMBRE,
            APELLIDO: CLIENTE.dataValues.APELLIDO,
            CORREO: CLIENTE.dataValues.CORREO,
            TOKEN: token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            OK: false,
            MSG: 'Error contacte al administrador'
        })
        next(err);
    }
}

controller.miPerfil = async function get(req, res, next) {
    try {
        let usuario = req.query.USUARIO;
        const CLIENTE = await CLIENTES.findOne({ where: { USUARIO: usuario } })
        if (!CLIENTE) {
            return res.status(404).json({
                OK: false,
                MSG: 'usuario no encontrado'
            })
        }
        //Validado
        return res.status(201).json({
            OK: true,
            MSG: 'Estos son los datos de tu perfil ',
            USUARIO: CLIENTE.dataValues.USUARIO,
            NOMBRE: CLIENTE.dataValues.NOMBRE,
            APELLIDO: CLIENTE.dataValues.APELLIDO,
            CORREO: CLIENTE.dataValues.CORREO,
            CELULAR: CLIENTE.dataValues.CELULAR,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            OK: false,
            MSG: 'Error contacte al administrador'
        })
        next(err);
    }
}

controller.historialAlquiler = async function get(req, res, next) {
    try {
        let usuario = obtenerUsuario(req);
        const CLIENTE = await CLIENTES.findOne({ where: { USUARIO: usuario }, attributes: ['ID'] })
        if (!CLIENTE) {
            return res.status(404).json({
                OK: false,
                MSG: 'usuario no encontrado'
            })
        }
        RESERVA.findAll({
                where: { ID_CLIENTE: CLIENTE.dataValues.ID },
                include: [{
                        model: SUCURSAL,
                        as: 'SUCURSAL_RETIRO',
                        required: true,
                        attributes: ['NOMBRE'],
                    },
                    {
                        model: SUCURSAL,
                        as: 'SUCURSAL_DEVOLUCION',
                        required: true,
                        attributes: ['NOMBRE'],
                    },
                    {
                        model: A_SUCURSAL,
                        required: true,
                        attributes: ['ID'],
                        include: [{
                            model: A_FLOTAS,
                            required: true,
                            attributes: ['MODELO', 'ANO'],
                            include: [{
                                model: A_MARCA,
                                required: true,
                                attributes: ['NOMBRE'],
                            }, {
                                model: A_TIPO,
                                as: 'TIPO_AUTO',
                                required: true,
                                attributes: ['NOMBRE'],
                            }],
                        }]
                    },
                ],
                attributes: ['CANTIDAD', 'createdAt', 'ENTREGADO_AGENCIA', 'FECHA_RETIRO', 'HORA_RETIRO', 'FECHA_DEVOLUCION', 'HORA_DEVOLUCION'],
                // raw: true
            })
            .then(data => {
                return res.status(201).json({
                    OK: true,
                    MSG: 'HISTORIAL DE ALQUILER',
                    USUARIO: usuario,
                    DATA: data
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    OK: false,
                    MSG: 'Error contacte al administrador'
                })
                next(err);
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            OK: false,
            MSG: 'Error contacte al administrador'
        })
        next(err);
    }
}


function getLoginBody(req) {
    const usuario = {
        USUARIO: req.body.USUARIO,
        PASSWORD: req.body.PASSWORD
    };
    return usuario;
}

function getClienteBody(req) {
    const cliente = {
        USUARIO: req.body.USUARIO,
        PASSWORD: req.body.PASSWORD,
        NOMBRE: req.body.NOMBRE,
        APELLIDO: req.body.APELLIDO,
        CORREO: req.body.CORREO,
        CELULAR: req.body.CELULAR,
    };
    return cliente;
}
module.exports = controller;