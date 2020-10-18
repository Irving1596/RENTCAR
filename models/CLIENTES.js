/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CLIENTES', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    USUARIO: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: "USUARIO_UNIQUE"
    },
    PASSWORD: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    NOMBRE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    APELLIDO: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    CORREO: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: "CORREO_UNIQUE"
    },
    CELULAR: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CLIENTES',
    timestamps: true
    });
};
