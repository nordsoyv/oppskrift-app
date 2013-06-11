'use strict';
/*global angular */

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.


var appServices = angular.module('OppskriftApp.services', ['ngResource', 'ui.bootstrap.dialog' ]);

appServices.factory('Oppskrifter', function ($resource) {
    return $resource('/api/v2/oppskrifter/:id', {}, {
        query: {method: 'GET', params: {id: 'all'}, isArray: true}
    });
});

//appServices.factory('dialogService', function ($dialogProvider) {
//    $dialogProvider.options({backdropClick: false, dialogFade: true})
//});





//angular.module('dialogService', ['ui.bootstrap.dialog'], function ($dialogProvider) {
//    $dialogProvider.options({backdropClick: false, dialogFade: true});
//});