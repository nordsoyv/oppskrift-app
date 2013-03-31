'use strict';

/* Controllers */



function IndexCtrl($scope, Posts) {
  $scope.posts = Posts.query();
}

function AddPostCtrl($scope, Posts, $location) {
  $scope.form = {steps:[],
                ingredients :[]};
  $scope.submitPost = function () {
    var newPost = new Posts();
    newPost.description = $scope.form.description;
    newPost.title = $scope.form.title;
    newPost.steps = $scope.form.steps;
    newPost.ingredients = $scope.form.ingredients;
    newPost.$save();
    $location.path('/');
  };

  $scope.deleteStep = function(index){
    $scope.form.steps.splice(index,1);
  };

  $scope.addStep = function(){
    $scope.form.steps.push({});
  };

  $scope.deleteIngredient = function(index){
    $scope.form.ingredients.splice(index,1);
  };

  $scope.addIngredient = function(){
    $scope.form.ingredients.push({amount:"",name:""});
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
    $scope.form.steps.push({});
  };

  $scope.deleteIngredient = function(index){
    $scope.form.ingredients.splice(index,1);
  };

  $scope.addIngredient = function(){
    $scope.form.ingredients.push({amount:"",name:""});
  };

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