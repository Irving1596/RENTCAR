/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('A_SUCURSAL', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_SUCURSAL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SUCURSAL',
        key: 'ID'
      },
      unique: "a_sucursal_ibfk_1"
    },
    ID_FLOTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'A_FLOTAS',
        key: 'ID'
      },
      unique: "a_sucursal_ibfk_2"
    },
    CANTIDAD_TOTAL: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CANTIDAD_DISPONIBLE: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'A_SUCURSAL',
    timestamps: true
    });
};
