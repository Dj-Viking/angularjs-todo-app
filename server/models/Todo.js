const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connConfig/connection.js');
const uuid = require('uuid');

class Todo extends Model {}

Todo.init
(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'todo'
  }
);

module.exports = Todo;