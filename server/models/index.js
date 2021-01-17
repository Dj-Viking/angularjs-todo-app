const User = require('./User.js');
const Todo = require('./Todo.js');
const Linker = require('./Linker.js')

User.belongsToMany(Todo, {
  through: Linker,
  foreignKey: 'todo_id'
});

Todo.belongsTo(User, {
  through: Linker,
  foreignKey: 'user_id',
})


module.exports = { User, Todo, Linker };