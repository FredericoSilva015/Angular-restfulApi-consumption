app.controller('myCtrl', ['$scope', 'dados', function($scope, dados) {

  //  request list of items, usualy this would go on automaticly, but i wanted to call on press, for automaticly, just remove getList wraper function
  $scope.getList = function() {

    $scope.tempValue = dados.query(function success(data) {}, function error(error) {});

    $scope.tempValue.$promise.then(function success(data) {

        $scope.data = data;
        // append a new atribute to the object so it can have edit form
        for (var val in $scope.data) {
          $scope.data[val].active = true;
        }
        // for some reason i am getting a list of 101 items from the server, i am cleaning the last value
        // $scope.data = $scope.data.map(function(e) {
        //   return e;
        // });
        // $scope.data.pop();
        // console.log($scope.items);
        // console.log($scope.data);
      },
      function error(error) {
        // console.error(error);
      });

  };

  // set ID binding
  $scope.id = null;


  // select one value of the list
  $scope.selectItem = function() {
    // id validation, possibly needs number validation
    if ($scope.id) {

      $scope.tempValue = dados.get({
        id: $scope.id
      },
      function success(data) {}, function error(error) {});

      $scope.tempValue.$promise.then(function success(data) {
      //clean the object
      // $scope.data = {};
      // add the data 1 level lower, so ng-repeat does not break
      // $scope.data[0] = data;
      // add the hide functionality for html
      // $scope.data[0].active = true;
      // console.log($scope.data);
      },
      function error(error) {
      // console.error(error);
      });

      }

    };

  // edit button to show form
  $scope.edit = function(val) {
    val = val-1;
    // console.log(val);
    $scope.data[val].active = !$scope.data[val].active;

  };

  $scope.submitItem = function(val) {
    val = val-1;
    $scope.tempData = {
      userId: $scope.data[val].userId,
      title: $scope.data[val].title,
      body: $scope.data[val].body
    };

    dados.update({
      id: (val + 1)
    },

    $scope.tempData, function success(data) {}, function error(error) {});
    //close form
    $scope.data[val].active = !$scope.data[val].active;

  };

  // delete button
  $scope.deleteItem = function(val) {

    angular.forEach($scope.data,function(key){
      
        if (key.id == val) {
          $scope.data.splice(key, 1);
        }

    });

    //if removal is sucesseful it should remove else, fail, sucess is a 200 from https connection
    dados.remove({
      id: val + 1
    });

  };

  // add item, going finish this soon
  $scope.add = {
    userId: '',
    title: '',
    body: ''
  };

  $scope.addItem = function() {
    dados.save($scope.add);
    alert('user created');
  };

}]);
