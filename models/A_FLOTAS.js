/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('A_FLOTAS', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_A_MARCA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'A_MARCA',
        key: 'ID'
      },
      unique: "a_flotas_ibfk_1"
    },
    MODELO: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    ANO: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_A_TIPO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'A_TIPO',
        key: 'ID'
      },
      unique: "a_flotas_ibfk_2"
    },
    TARIFA_DIARIA: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'A_FLOTAS',
    timestamps: true
    });
};
