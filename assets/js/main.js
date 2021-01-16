const main = angular.module('main', []);

main.controller('main', function($scope, $http) {
  
  $scope.textInput = '';
  $scope.textInputSubscription = '';
  $scope.textInputLength = 0;
  $scope.errorInputTooLong = '';
  $scope.inputLengthIsError = false;

  $scope.todos = [];
  $scope.todoId = '';
  $scope.quotes = [];
  $scope.currentQuote = '';

  $http.get("https://type.fit/api/quotes")
  .then(response => {
    console.log(response);
    console.log('got quotes');
    $scope.quotes = response.data;
    console.log($scope.quotes);
    //set a random quote from the quotes array
    let randomIndex = Math.floor(Math.random() * $scope.quotes.length);
    $scope.currentQuote = 
    `
      "${$scope.quotes[randomIndex].text}" - ${$scope.quotes[randomIndex].author === null ? 'Unknown' : $scope.quotes[randomIndex].author }
    `;
    console.log('quote index', randomIndex);
  })
  .catch(e => console.log(e));

  $scope.observeInputChange = function() {

    //set length variable to observed value
    
    $scope.textInput === undefined || ''
    ? $scope.textInputLength = 0 
    : $scope.textInputLength = $scope.textInput.length;

    if($scope.textInputLength > 30) 
    {
      $scope.errorInputTooLong = 
        'Your input has exceeded the 30 character limit';
      $scope.inputLengthIsError = true;
    } 
    else if($scope.textInputLength <= 30)
    {
      $scope.inputLengthIsError = false;
    }

    $scope.textInputSubscription = $scope.textInput;
    //console.log($scope.textInputSubscription);
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
      //create a moment date
      $scope.todoDateCreated = moment(Date.now()).format(`MMM DD, YYYY hh:mm:ss${`a`.toUpperCase()}`);
      //console.log($scope.todoDateCreated.split(' ').splice(3, 1).join(''));
      //get time out of the date created above
      $scope.todoTimeCreated = timeConversion($scope.todoDateCreated.split(' ')[3]);
      //isolate only date
      $scope.todoDateCreated = $scope.todoDateCreated.split(' ').splice(0, 3).join(' ');
      console.log($scope.todoDateCreated);

      $scope.todoId = uuid.v4();
      $scope.errorInputTooLong = '';
      $scope.todos.push(
        {
          id: $scope.todoId,
          text: $scope.textInput,
          createdAt: `Created: ${$scope.todoDateCreated} @ ${$scope.todoTimeCreated}`
        }
      );
      console.log($scope.todos);

      //reset todoId after push
      $scope.todoId = '';
  
      console.log('added todo in todos array');
    }
  };

  $scope.removeTodo = function(event) {
    let itemId = event.target.parentElement.children[0].innerText;

    //console.log('item to remove id: ', event.target.parentElement.children[0].innerText);

    for (let i = 0; i < $scope.todos.length; i++)
    {
      if (itemId === $scope.todos[i].id)
      {
        //remove the todo from the array at the index we found the id on
        $scope.todos.splice(i, 1);
      }
    }
    
    console.log('removed todo');
    console.log('todos array now', $scope.todos);
  }

  $scope.formSubmit = function(event) {
    event.preventDefault();
    //if char limit reached return
    console.log($scope.textInput.length);
    if ($scope.textInput.length > 30)
    {
      $scope.errorInputTooLong = 
        'Your input has exceeded the 30 character limit';
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
      $scope.textInputLength = 0;
    }
  };

});