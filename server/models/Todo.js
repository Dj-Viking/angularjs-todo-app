const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connConfig/connection.js');

class Todo extends Model {}

Todo.init
(
  {
    uuid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [30]
      }
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