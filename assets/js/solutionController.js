app.controller('myCtrl', ['$scope', 'dados', function($scope, dados) {
  //  request list of items, usualy this would go on automaticly, but i wanted to call on press, for automaticly, just remove getList wraper function
  $scope.getList = function() {
    $scope.tempValue = dados.query();
    $scope.tempValue.$promise.then(function success(data) {
      $scope.data = data;
      // append a new atribute to the object so it can have edit form
      for (var val in $scope.data) {
        $scope.data[val]['active'] = true;
      }
      // console.log(data);
    }, function error(error) {
      // console.error(error);
    });
  };

  // set model binding
  $scope.id = null;
  // select one value of the list
  $scope.selectItem = function() {
    // id validation, possibly needs number validation
    if ($scope.id) {
      $scope.tempValue = dados.get({
        id: $scope.id
      });
      $scope.tempValue.$promise.then(function success(data) {
        //clean the object
        $scope.data = {};
        // add the data 1 level lower, so ng-repeat does not break
        $scope.data[$scope.id] = data;
        // add the hide functionality for html
        $scope.data[$scope.id]['active'] = true;
        // console.log($scope.data);
      }, function error(error) {
        // console.error(error);
      });
    }
  };

  // edit button to show form
  $scope.edit = function(val) {
    $scope.data[val].active = !$scope.data[val].active;
  };

  $scope.submitItem = function(val) {
    $scope.tempValue = dados.get({
      id: (val + 1)
    });
    $scope.tempValue.$promise.then(function success(data) {
      //update data object
      data.userId = $scope.data[val].userId
      data.title = $scope.data[val].title
      data.body = $scope.data[val].body;
      // send put request for update
      dados.update({
        id: (val + 1)
      }, data);
      //close the submit
      $scope.data[val].active = !$scope.data[val].active;
    }, function error(error) {
      // console.error(error);
    });
  };

  // delete button
  $scope.deleteItem = function(val) {
    var result = $scope.data.map(function(e) {
      return e;
    });

    dados.remove({
      id: val + 1
    });
    result.splice(val, 1);
    $scope.data = result;
  };

  // add item
  $scope.add = {
    id: '',
    title: '',
    body: ''
  };

  $scope.addItem = function() {

  };
}]);
