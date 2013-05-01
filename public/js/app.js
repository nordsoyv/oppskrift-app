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
      when('/addOppskrift', {
        templateUrl: 'partials/addOppskrift',
        controller: AddOppskriftCtrl
      }).
      when('/readOppskrift/:id', {
        templateUrl: 'partials/readOppskrift',
        controller: ReadOppskriftCtrl
      }).
      when('/editOppskrift/:id', {
        templateUrl: 'partials/editOppskrift',
        controller: EditOppskriftCtrl
      }).
      when('/deleteOppskrift/:id', {
        templateUrl: 'partials/deleteOppskrift',
        controller: DeleteOppskriftCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);