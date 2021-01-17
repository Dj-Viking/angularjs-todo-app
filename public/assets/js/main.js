const main = angular.module('main', []);

main.controller('main', function($scope, $http) {
  
  $scope.textInput = {
    text: '',
    pattern: /.+/
  }
  $scope.textInputSubscription = '';
  $scope.textInputLength = 0;
  $scope.errorInputTooLong = '';

  $scope.inputLengthIsError = false;

  $scope.showModal = false;
  $scope.modalTextInput = {
    text: '',
    pattern: /.+/
  }
  $scope.modalTextInputSubscription = '';
  $scope.modalTextInputLength = 0;
  $scope.modalErrorInputTooLong = '';
  $scope.modalInputLengthIsError = false;
  $scope.modalCurrentTodoDate = '';
  $scope.modalCurrentTodoId = '';

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
    
    $scope.textInput.text === undefined || ''
    ? $scope.textInputLength = 0 
    : $scope.textInputLength = $scope.textInput.text.length;

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

    $scope.textInputSubscription = $scope.textInput.text;
    console.log($scope.textInputSubscription);
  }

  $scope.addTodo = function() {
    //if char limit reached return
    console.log($scope.textInput.text.length);
    if ($scope.textInputLength > 30)
    {
      return;
    }
    //if empty return
    else if ($scope.textInput.text === '') 
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
          text: $scope.textInput.text,
          createdAt: `Created: ${$scope.todoDateCreated} @ ${$scope.todoTimeCreated}`
        }
      );
      console.log($scope.todos);

      //reset todoId after push
      $scope.todoId = '';
  
      console.log('added todo in todos array');
    }
  };

  $scope.openModal = function(event) {
    //show modal
    $scope.showModal = true;
    $scope.modalCurrentTodoDate = '';
    //focus on text input
    setTimeout(() => {
      document.querySelector('#modal-text-input').focus();
    }, 100);

    //console.log(event.target.parentElement.parentElement.parentElement.children[0].innerText);
    console.log('id of todo we want to edit', event.target.id);
    //get todo by id
    for (let i = 0; i < $scope.todos.length; i++) 
    {
      if (event.target.id === $scope.todos[i].id)
      {
        console.log($scope.todos[i]);
        //set modalCurrentTodoDate to the 
        // todo createdAt that we found
        $scope.modalCurrentTodoDate = $scope.todos[i].createdAt;
        //set modalCurrentTodoId to the
        // todo we found
        $scope.modalCurrentTodoId = $scope.todos[i].id;
      }
    }
  }

  $scope.observeModalInputChange = function() {

    $scope.modalTextInput.text === undefined || ''
    ? $scope.modalTextInputLength = 0
    : $scope.modalTextInputLength = $scope.modalTextInput.text.length

    if($scope.modalTextInputLength > 30) 
    {
      $scope.modalErrorInputTooLong = 
        'Your input has exceeded the 30 character limit';
      $scope.modalInputLengthIsError = true;
    } 
    else if($scope.textInputLength <= 30)
    {
      $scope.modalInputLengthIsError = false;
    }

    $scope.modalTextInputSubscription = $scope.modalTextInput.text;
    console.log($scope.modalTextInputSubscription);

  }

  $scope.editTodo = function() {
    
    console.log($scope.modalTextInputLength);
    
    //if char limit reached return
    if ($scope.modalTextInputLength > 30) return;
    else if ($scope.modalTextInputLength <= 30) 
    {
      for (let i = 0; i < $scope.todos.length; i++) 
      {
        if ($scope.modalCurrentTodoId === $scope.todos[i].id)
        {
          //modify the text of the todo we found by ID
          $scope.todos[i].text = $scope.modalTextInput.text
        }
      }
    }
    closeModalAndUnfocus($scope);
  }

  $scope.closeModal = () => closeModalAndUnfocus($scope);

  $scope.removeTodo = function(event) {
    
    closeModal($scope);

    console.log('id of todo we want to remove', event.target.id);
    //if (event.target)
    for (let i = 0; i < $scope.todos.length; i++)
    {
      if (event.target.id === $scope.todos[i].id)
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
    console.log($scope.textInputLength);
    if ($scope.textInputLength > 30)
    {
      $scope.errorInputTooLong = 
        'Your input has exceeded the 30 character limit';
      return;
    }
    //if empty return
    else if ($scope.textInput.text === '') 
    {
      return;
    }
    else
    {
      console.log(event.target[0].value);
      console.log('form submitted');
  
      //reset input field
      $scope.textInput.text = '';
      $scope.textInputLength = 0;
    }
  };

});

//close modal
function closeModal($scope) {
  $scope.showModal = false;
  $scope.modalInputLengthIsError = false;
  $scope.modalTextInput.text = '';
  $scope.modalTextInputLength = 0;
}

//unfocus input field and close modal
function closeModalAndUnfocus($scope) {
  document.querySelector('#modal-text-input').blur();
  $scope.showModal = false;
  $scope.modalInputLengthIsError = false;
  $scope.modalTextInput.text = '';
  $scope.modalTextInputLength = 0; 
}