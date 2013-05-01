'use strict';
/*global angular, IndexCtrl,AddPostCtrl,ReadPostCtrl ,EditPostCtrl, DeletePostCtrl, $resource*/

// Declare app level module which depends on filters, and services
angular.module('OppskriftApp', ['OppskriftApp.filters', 'OppskriftApp.services', 'OppskriftApp.directives']).
  config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/addPost', {
        templateUrl: 'partials/addPost',
        controller: AddOppskriftCtrl
      }).
      when('/readPost/:id', {
        templateUrl: 'partials/readPost',
        controller: ReadOppskriftCtrl
      }).
      when('/editPost/:id', {
        templateUrl: 'partials/editPost',
        controller: EditOppskriftCtrl
      }).
      when('/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeleteOppskriftCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);