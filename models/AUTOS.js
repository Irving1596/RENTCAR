/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AUTOS', {
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
      unique: "FK_SUCURSAL"
    },
    ID_A_MARCA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'A_MARCA',
        key: 'ID'
      },
      unique: "FK_MARCA_AUTO"
    },
    MODELO: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    ID_A_TIPO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'A_TIPO',
        key: 'ID'
      },
      unique: "FK_TIPO_AUTO"
    },
    TARIFA_DIARIA: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    CANTIDAD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "1 SI DISPONIBLE\n0 NO DISPONIBLE"
    }
  }, {
    sequelize,
    tableName: 'AUTOS',
    timestamps: true
    });
};
