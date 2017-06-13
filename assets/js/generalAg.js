var app = angular.module('app', ['ngResource','ngAnimate']);

app.filter('searchFor', function(){
  return function(vector,identifier){

    // input validation, for the array and insert
    if (!vector || !identifier) {
      return vector;
    }
    else {

      var result = [];

      angular.forEach(vector,function(key){

          if (key.id == identifier) {
          result.push(key);
          }

      });

      return result;
    }

  };
});

app.factory("dados", function($resource) {
  return $resource('https://jsonplaceholder.typicode.com/posts/:id', null, {
    'update': {method: 'PUT'},
    'query':{method:'GET', isArray:true}
  });

});
// guide for available default actions
// { 'get':    {method:'GET'},
//   'save':   {method:'POST'},
//   'query':  {method:'GET', isArray:true},  //extra comment if you set query array has fault, if you have item on http request, they have to be sent with the request or it will fail
//   'remove': {method:'DELETE'},
//   'delete': {method:'DELETE'} }; // reserved possibly in IE6 use remove

app.directive('ngConfirmClick', [function() {
    return {
      link: function(scope, element, attr) {
        var msg = attr.ngConfirmClick || "Are you sure?";
        var clickAction = attr.confirmedClick;
        element.bind('click', function(event) {
          if (window.confirm(msg)) {
            scope.$eval(clickAction);
          }
        });
      }
    };
  }
]);
