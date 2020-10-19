const db = require("../models/init-models.js");
const models = db.initModels(db.sequelize);
const A_SUCURSAL = models.A_SUCURSAL;
const SUCURSAL = models.SUCURSAL;
const FLOTAS = models.A_FLOTAS;
const A_TIPO = models.A_TIPO;
const A_MARCA = models.A_MARCA;
const RESERVA = models.RESERVA;
const CLIENTES = models.CLIENTES;
const Op = db.Sequelize.Op;
const controller = {};

/*
 *SE OBTIENE FLOTA DISPONIBLE DE AUTOS
 */
controller.getAllAutos = async function get(req, res, next) {

    A_SUCURSAL.findAll({
            where: {
                CANTIDAD_DISPONIBLE: {
                    [Op.gt]: 0
                }
            },
            include: [{
                model: SUCURSAL,
                required: true,
                attributes: ['NOMBRE']
            }, {
                model: FLOTAS,
                include: [{
                        model: A_TIPO,
                        as: 'TIPO_AUTO',
                        required: true,
                        attributes: ['NOMBRE']
                    },
                    {
                        model: A_MARCA,
                        required: true,
                        attributes: ['NOMBRE'],
                    }
                ],
                attributes: ['ANO', 'MODELO', 'TARIFA_DIARIA'],
            }],
            attributes: ['CANTIDAD_DISPONIBLE'],
            // raw: true
        })
        .then(data => {
            return res.status(201).json({
                OK: true,
                MSG: 'AUTOS DISPONIBLES',
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
}

/** 
 * SE REGISTRA LA ORDEN DE ALQUILER
 */
controller.crearOrdenAuto = async function post(req, res, next) {

    // SE obtiene del req.body de la orden
    let ordenAuto = getOrdenAutoBody(req);

    let INFO_AUTOSUCURSAL = await A_SUCURSAL.findByPk(ordenAuto.ID_ASUCURSAL, {
        attributes: ['CANTIDAD_DISPONIBLE']
    });
    if (!INFO_AUTOSUCURSAL) {
        return res.status(201).json({
            OK: false,
            MSG: 'El auto especificada no existe en la BD'
        });
    }
    let cantidad_disponible = INFO_AUTOSUCURSAL.dataValues.CANTIDAD_DISPONIBLE
    if (cantidad_disponible < 1 || ordenAuto.CANTIDAD > cantidad_disponible) {
        return res.status(201).json({
            OK: false,
            MSG: 'No hay Autos disponible para la orden solicitada. Quedan disponibles:' + cantidad_disponible
        });
    }
    const CLIENTE = await CLIENTES.findOne({ where: { USUARIO: ordenAuto.ID_CLIENTE }, attributes: ['ID'] });
    if (!CLIENTE) {
        return res.status(404).json({
            OK: false,
            MSG: 'usuario no encontrado' //es preferible aveces no especificar el error, para evitar ataques de fuerza bruta
        })
    }
    ordenAuto.ID_CLIENTE = CLIENTE.dataValues.ID;
    // Se guarda en la base de datos
    RESERVA.create(ordenAuto)
        .then(data => {
            A_SUCURSAL.update({ CANTIDAD_DISPONIBLE: cantidad_disponible - data.CANTIDAD }, {
                where: { ID: data.ID_ASUCURSAL }
            }).then(ROWS_AFFECT => {
                if (ROWS_AFFECT == 1) {
                    return res.status(201).json({
                        OK: true,
                        MSG: 'SE CREO LA ORDEN SATISFACTORIAMENTE',
                        DATA: data
                    });
                }
            }).catch(err => {
                return res.status(500).json({
                    OK: false,
                    MSG: 'NO SE ACTUALIZO EL CAMPO CANTIDAD DISPONIBLE EN A_SUCURSAL=' + data.ID_ASUCURSAL
                });
            });
        }).catch(err => {
            return res.status(500).json({
                OK: false,
                MSG: 'ERROR AL CREAR LA ORDEN'
            });
        });
}

//Funcion que ordena la data de orden de autos
function getOrdenAutoBody(req) {
    const ordenAuto = {
        ID_CLIENTE: req.body.USUARIO,
        ID_ASUCURSAL: req.body.ID_ASUCURSAL,
        ID_SUCURSAL_RETIRO: req.body.ID_SUCURSAL_RETIRO,
        CANTIDAD: req.body.CANTIDAD,
        ID_SUCURSAL_DEVOLUCION: req.body.ID_SUCURSAL_DEVOLUCION,
        FECHA_RETIRO: req.body.FECHA_RETIRO,
        HORA_RETIRO: req.body.HORA_RETIRO,
        FECHA_DEVOLUCION: req.body.FECHA_DEVOLUCION,
        HORA_DEVOLUCION: req.body.HORA_DEVOLUCION,
        COMENTARIO: req.body.COMENTARIO,

    };
    return ordenAuto;
}

module.exports = controller;