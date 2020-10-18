/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SUCURSAL', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOMBRE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    HORA_APERTU: {
      type: DataTypes.TIME,
      allowNull: false
    },
    HORA_CIERRE: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'SUCURSAL',
    timestamps: true
    });
};
