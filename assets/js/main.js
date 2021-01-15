const main = angular.module('main', []);

main.controller('main', function($scope) {

  $scope.textInput = '';
  $scope.textInputSubscription = '';
  $scope.errorInputTooLong = '';

  $scope.todos = [];

  $scope.observeInputChange = function() {
    //same as $scope.textInput
    //console.log(this.textInput);
    console.log($scope.textInput.length);
    $scope.textInputSubscription = $scope.textInput;
    console.log($scope.textInputSubscription);
  }

  $scope.addTodo = function() {
    //if char limit reached return
    console.log($scope.textInput.length);
    if ($scope.textInput.length > 30)
    {
      return;
    }
    //if empty return
    else if ($scope.textInput === '') 
    {
      return;
    }
    else 
    {
      $scope.errorInputTooLong = '';
      $scope.todos.push(
        {
          id: uuid.v4(),
          text: $scope.textInput
        }
      );
      console.log($scope.todos);
  
      console.log('added todo in todos array');
    }
  };

  $scope.removeTodo = function() {

    console.log('removed todo');
  }

  $scope.formSubmit = function(event) {
    event.preventDefault();
    //if char limit reached return
    console.log($scope.textInput.length);
    if ($scope.textInput.length > 30)
    {
      $scope.errorInputTooLong = 
        'Your input has too many characters';
      return;
    }
    //if empty return
    else if ($scope.textInput === '') 
    {
      return;
    }
    else
    {
      console.log(event.target[0].value);
      console.log('form submitted');
  
      //reset input field
      $scope.textInput = '';
  
    }
  };

});