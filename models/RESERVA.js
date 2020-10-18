/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RESERVA', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_CLIENTE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CLIENTES',
        key: 'ID'
      },
      unique: "reserva_ibfk_1"
    },
    ID_ASUCURSAL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'A_SUCURSAL',
        key: 'ID'
      },
      unique: "reserva_ibfk_2"
    },
    CANTIDAD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    ID_SUCURSAL_RETIRO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SUCURSAL',
        key: 'ID'
      },
      unique: "reserva_ibfk_3"
    },
    ID_SUCURSAL_DEVOLUCION: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SUCURSAL',
        key: 'ID'
      },
      unique: "reserva_ibfk_4"
    },
    FECHA_RETIRO: {
      type: DataTypes.DATE,
      allowNull: false
    },
    HORA_RETIRO: {
      type: DataTypes.TIME,
      allowNull: false
    },
    FECHA_DEVOLUCION: {
      type: DataTypes.DATE,
      allowNull: false
    },
    HORA_DEVOLUCION: {
      type: DataTypes.TIME,
      allowNull: false
    },
    COMENTARIO: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    ENTREGADO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'RESERVA',
    timestamps: true
    });
};
