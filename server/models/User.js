const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connConfig/connection.js');
const bcrypt = require('bcrypt');
require('dotenv').config();

class User extends Model {
  checkPassword(pw) {
    return bcrypt.compareSync(pw, this.password);
  }
}

User.init
(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    },
    todo_id: {
      type: DataTypes.UUIDV4,
      references: {
        model: 'todo',
        key: 'id'
      }
    }
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, Number(process.env.SALT));
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, Number(process.env.SALT));
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;