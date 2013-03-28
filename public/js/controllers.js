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

function EditPostCtrl($scope, Posts, $location, $routeParams) {
  $scope.form = Posts.get({id:$routeParams.id});

  $scope.editPost = function () {
    $scope.form.$save({id:$routeParams.id});
    $location.url('/readPost/' + $routeParams.id);
  };

  $scope.deleteStep = function(index){
    $scope.form.steps.splice(index,1);
  };

  $scope.addStep = function(){
    $scope.form.steps.push("");
  }
}

function DeletePostCtrl($scope, Posts, $location, $routeParams) {
  $scope.post = Posts.get({id:$routeParams.id});
  $scope.deletePost = function () {
    $scope.post.$delete({id:$routeParams.id});
    $location.url('/');
  };

  $scope.home = function () {
    $location.url('/');
  };
}