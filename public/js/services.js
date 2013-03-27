'use strict';
/*global angular */

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.



angular.module('myApp.services', ['ngResource']).
    factory('Posts', function($resource){
  return $resource('/api/v2/post/:id', {}, {
   query: {method:'GET', params:{id:'all'}, isArray:true}
   /*update: {method: 'PUT'}*/
  });
});