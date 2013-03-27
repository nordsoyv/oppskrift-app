'use strict';

/* Controllers */



function IndexCtrl($scope, Posts) {
  $scope.posts = Posts.query();
}

function AddPostCtrl($scope, Posts, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    var newPost = new Posts();
    newPost.text = $scope.form.text;
    newPost.title = $scope.form.title;
    newPost.$save();
    $location.path('/');
  };
}

function ReadPostCtrl($scope, $routeParams, Posts) {
  $scope.post = Posts.get({id:$routeParams.id});
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/v1/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/v1/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/v1/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/v1/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}