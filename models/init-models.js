const dbConfig = require("../config/database.js");
const Sequelize = require("sequelize");
var DataTypes = require("sequelize").DataTypes;
var _A_FLOTAS = require("./A_FLOTAS");
var _A_MARCA = require("./A_MARCA");
var _A_TIPO = require("./A_TIPO");
var _A_SUCURSAL = require("./A_SUCURSAL");
var _RESERVA = require("./RESERVA");
var _CLIENTES = require("./CLIENTES");
var _SUCURSAL = require("./SUCURSAL");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
    // operatorsAliases: false,
    pool: dbConfig.pool
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.initModels = function initModels(sequelize) {
    var A_FLOTAS = _A_FLOTAS(sequelize, DataTypes);
    var A_MARCA = _A_MARCA(sequelize, DataTypes);
    var A_TIPO = _A_TIPO(sequelize, DataTypes);
    var A_SUCURSAL = _A_SUCURSAL(sequelize, DataTypes);
    var RESERVA = _RESERVA(sequelize, DataTypes);
    var CLIENTES = _CLIENTES(sequelize, DataTypes);
    var SUCURSAL = _SUCURSAL(sequelize, DataTypes);
    SUCURSAL.hasMany(A_SUCURSAL, { 'foreignKey': 'ID' });
    A_SUCURSAL.belongsTo(SUCURSAL, { 'foreignKey': 'ID_SUCURSAL' });
    A_FLOTAS.hasMany(A_SUCURSAL, { 'foreignKey': 'ID' });
    A_SUCURSAL.belongsTo(A_FLOTAS, { 'foreignKey': 'ID_FLOTA' });
    A_TIPO.hasMany(A_FLOTAS, { as: 'TIPO_AUTO', 'foreignKey': 'ID' });
    A_FLOTAS.belongsTo(A_TIPO, { as: 'TIPO_AUTO', 'foreignKey': 'ID_A_TIPO' });
    A_MARCA.hasMany(A_FLOTAS, { 'foreignKey': 'ID' });
    A_FLOTAS.belongsTo(A_MARCA, { 'foreignKey': 'ID_A_MARCA' });
    SUCURSAL.hasMany(RESERVA, { as: 'SUCURSAL_RETIRO', 'foreignKey': 'ID' });
    RESERVA.belongsTo(SUCURSAL, { as: 'SUCURSAL_RETIRO', 'foreignKey': 'ID_SUCURSAL_RETIRO' })
    SUCURSAL.hasMany(RESERVA, { as: 'SUCURSAL_DEVOLUCION', 'foreignKey': 'ID' });
    RESERVA.belongsTo(SUCURSAL, { as: 'SUCURSAL_DEVOLUCION', 'foreignKey': 'ID_SUCURSAL_DEVOLUCION' })
    A_SUCURSAL.hasMany(RESERVA, { 'foreignKey': 'ID' });
    RESERVA.belongsTo(A_SUCURSAL, { 'foreignKey': 'ID_ASUCURSAL' })


    return {
        A_FLOTAS,
        A_MARCA,
        A_TIPO,
        A_SUCURSAL,
        RESERVA,
        CLIENTES,
        SUCURSAL,
    };
}
module.exports = db;