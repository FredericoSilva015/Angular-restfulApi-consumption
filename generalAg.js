var app = angular.module('app', ['ngResource']);


app.factory("dados", function($resource) {
  return $resource('https://jsonplaceholder.typicode.com/posts/:id', null, {
    'update': {
      method: 'PUT'
    }
  });

});
// guide for available default actions
// { 'get':    {method:'GET'},
//   'save':   {method:'POST'},
//   'query':  {method:'GET', isArray:true},  //extra comment if you set query array has fault, if you have item on http request, they have to be sent with the request or it will fail
//   'remove': {method:'DELETE'},
//   'delete': {method:'DELETE'} }; // reserved possibly in IE6 use remove
