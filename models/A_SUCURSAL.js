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
      unique: "FK_SUCURSAL"
    },
    ID_FLOTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'A_FLOTAS',
        key: 'ID'
      },
      unique: "FK_AFLOTAS"
    },
    CANTIDAD_TOTAL: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CANTIDAD_DISPONIBLE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UPDATED_AT: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'A_SUCURSAL',
    timestamps: true
    });
};
