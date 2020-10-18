const dbConfig = require("../config/database.js");
const Sequelize = require("sequelize");
var DataTypes = require("sequelize").DataTypes;
var _A_FLOTAS = require("./A_FLOTAS");
var _A_TIPO = require("./A_TIPO");
var _A_SUCURSAL = require("./A_SUCURSAL");
var _CLIENTES = require("./CLIENTES");
var _A_MARCA = require("./A_MARCA");
var _SUCURSAL = require("./SUCURSAL");
var _RESERVA = require("./RESERVA");

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    // operatorsAliases: false,
    pool: dbConfig.pool
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

function initModels(sequelize) {
    var A_FLOTAS = _A_FLOTAS(sequelize, DataTypes);
    var A_TIPO = _A_TIPO(sequelize, DataTypes);
    var A_SUCURSAL = _A_SUCURSAL(sequelize, DataTypes);
    var CLIENTES = _CLIENTES(sequelize, DataTypes);
    var A_MARCA = _A_MARCA(sequelize, DataTypes);
    var SUCURSAL = _SUCURSAL(sequelize, DataTypes);
    var RESERVA = _RESERVA(sequelize, DataTypes);

    return {
        A_FLOTAS,
        A_TIPO,
        A_SUCURSAL,
        CLIENTES,
        A_MARCA,
        SUCURSAL,
        RESERVA,
    };
}
module.exports = initModels;
module.exports = db;