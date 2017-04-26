var app = angular.module('app', ['ngResource']);


app.factory("api", function($resource) {
    return $resource("https://reqres.in/api/users?page=1&:id");
});

app.controller('myCtrl', ['$scope', 'api', function($scope, api) {
    api.get(function(data) {
        $scope.table = data;
        console.log($scope.table);
    });
    // api.post(function(data) {
    //     $scope.data = {
    //         "name": "morpheus",
    //         "job": "leader"
    //     };
    //     console.log($scope.table);
    // });

}]);
