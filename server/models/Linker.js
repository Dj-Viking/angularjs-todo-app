const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connConfig/connection.js');

class Linker extends Model {}

Linker.init
(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    todo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'todo',
        key: 'id'
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'linker'
  }
);

module.exports = Linker;