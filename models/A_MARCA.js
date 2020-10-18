/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('A_MARCA', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOMBRE: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'A_MARCA',
    timestamps: false
    });
};
