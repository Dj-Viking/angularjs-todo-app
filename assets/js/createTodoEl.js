function createTodo(todoText) {
  return "<li>" + todoText + "<button ng-click='removeTodo()'>X</button></li>";
};