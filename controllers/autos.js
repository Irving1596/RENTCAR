const db = require("../models/init-models.js");
const models = db.initModels(db.sequelize);
const A_SUCURSAL = models.A_SUCURSAL;
const SUCURSAL = models.SUCURSAL;
const FLOTAS = models.A_FLOTAS;
const A_TIPO = models.A_TIPO;
const A_MARCA = models.A_MARCA;



const Op = db.Sequelize.Op;
const controller = {};
SUCURSAL.hasMany(A_SUCURSAL, { 'foreignKey': 'ID' });
A_SUCURSAL.belongsTo(SUCURSAL, { 'foreignKey': 'ID_SUCURSAL' });
FLOTAS.hasMany(A_SUCURSAL, { 'foreignKey': 'ID' });
A_SUCURSAL.belongsTo(FLOTAS, { 'foreignKey': 'ID_FLOTA' });
A_TIPO.hasMany(FLOTAS, { 'foreignKey': 'ID' });
FLOTAS.belongsTo(A_TIPO, { 'foreignKey': 'ID_A_TIPO' });
A_MARCA.hasMany(FLOTAS, { 'foreignKey': 'ID' });
FLOTAS.belongsTo(A_MARCA, { 'foreignKey': 'ID_A_MARCA' });

/*
 *SE OBTIENE FLOTA DISPONIBLE DE AUTOS
 */
controller.getAllAutos = async function get(req, res, next) {


    //const title = req.query.title;
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    console.log("MODELS", models);
    console.log("A_SUCURSAL", A_SUCURSAL);
    console.log("SUCURSAL", SUCURSAL);
    A_SUCURSAL.findAll({
            include: [{
                model: SUCURSAL,
                required: true,
                attributes: ['NOMBRE']
            }, {
                model: FLOTAS,
                include: [{
                        model: A_TIPO,
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
            raw: true
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



    /*
                try {
            const context = {};
            context.sede_cru = req.query.sede_cru;

            const ID_ESTADO = await catedras.find_catedraestadocru(context);
            if (!ID_ESTADO) {
                return res.status(201).json({
                    OK: false,
                    MSG: 'NO HAY REGISTRO',
                    ID_ESTADO: 0
                });
            }

            return res.status(201).json({
                OK: true,
                MSG: 'ESTADO DE CATEDRA',
                ID_ESTADO
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({
                OK: false,
                MSG: 'Error contacte al administrador'
            })
            next(err);
        }*/
}
module.exports = controller;