import test from './test.js';
const main = angular.module('main', []);

main.controller('main', function($scope) {

  $scope.textInput = '';

  $scope.textInputTwo = '';

  $scope.seeChange = function() {
    //same as $scope
    //console.log(this.textInput);
    // console.log($scope.textInput);

    $scope.textInputTwo = $scope.textInput;

    console.log($scope.textInputTwo);
  }

  $scope.inputChange = function(event) {
    console.log(event.target.value);
    $scope.textInput = event.target.value
  }

  $scope.addTodo = function() {

    console.log('added todo');
  };

  $scope.removeTodo = function() {

    console.log('removed todo');
  }

  $scope.formSubmit = function(event) {
    event.preventDefault();
    console.log(event.target[0].value);
    console.log('form submitted');

    test();
  };

});