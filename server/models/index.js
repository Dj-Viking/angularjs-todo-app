const User = require('./User.js');
const Todo = require('./Todo.js');

User.hasMany(Todo, {
  foreignKey: 'todo_id'
});

Todo.belongsTo(User, {
  foreignKey: 'todo_id'
});

module.exports = { User, Todo };