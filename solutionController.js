var app = angular.module('app', ['ngResource']);


app.factory("dados", function($resource) {
    return $resource('https://jsonplaceholder.typicode.com/posts/:id', {
        'query': {
            method: 'GET',
            isArray: false
        },
        'update': {
            method: 'PUT'
        }
    });

});
// guide for available default actions
// { 'get':    {method:'GET'},
//   'save':   {method:'POST'},
//   'query':  {method:'GET', isArray:true},
//   'remove': {method:'DELETE'},
//   'delete': {method:'DELETE'} };

app.controller('myCtrl', ['$scope', 'dados', function($scope, dados) {

    //  update the list of items, it also serves to start up the list
    $scope.getList = function() {
        $scope.tempValue = dados.query({
            id: ''
        });
        $scope.tempValue.$promise.then(function(data) {
            $scope.data = data;
            // console.log($scope.data);
        });
    };

    $scope.id = null;
    // select one value of the list
    $scope.selectItem = function() {
        // id validation
        if ($scope.id) {
            $scope.tempValue = dados.get({
                id: $scope.id
            });
            $scope.tempValue.$promise.then(function(data) {
                //clean the object
                $scope.data = {};
                // add the data 1 level lower, so ng-repeat does not break
                $scope.data.d = data;
                // console.log($scope.data);
            });
        }

    };


}]);
