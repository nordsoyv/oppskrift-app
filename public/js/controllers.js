'use strict';

/* Controllers */


function IndexCtrl($scope, Oppskrifter) {
    $scope.oppskrifter = Oppskrifter.query();
}

function AddOppskriftCtrl($scope, Oppskrifter, $location) {
    $scope.form = {
        steps: [
            {}
        ],
        ingredients: [
            {}
        ]};

    $scope.submitPost = function () {
        var newOppskrift = new Oppskrifter();
        newOppskrift.description = $scope.form.description;
        newOppskrift.title = $scope.form.title;
        newOppskrift.steps = $scope.form.steps;
        newOppskrift.ingredients = $scope.form.ingredients;
        newOppskrift.$save();
        $location.path('/');
    };

    $scope.deleteStep = function (index) {
        $scope.form.steps.splice(index, 1);
    };

    $scope.addStep = function () {
        $scope.form.steps.push({});
    };

    $scope.deleteIngredient = function (index) {
        $scope.form.ingredients.splice(index, 1);
    };

    $scope.addIngredient = function () {
        $scope.form.ingredients.push({amount: "", name: ""});
    };

}

function ReadOppskriftCtrl($scope, $routeParams, Oppskrifter) {
    $scope.oppskrift = Oppskrifter.get({id: $routeParams.id});
}

function EditOppskriftCtrl($scope, Oppskrifter, $location, $routeParams) {
    $scope.form = Oppskrifter.get({id: $routeParams.id});

    $scope.editPost = function () {
        $scope.form.$save({id: $routeParams.id});
        $location.url('/readPost/' + $routeParams.id);
    };

    $scope.deleteStep = function (index) {
        $scope.form.steps.splice(index, 1);
    };

    $scope.addStep = function () {
        $scope.form.steps.push({});
    };

    $scope.deleteIngredient = function (index) {
        $scope.form.ingredients.splice(index, 1);
    };

    $scope.addIngredient = function () {
        $scope.form.ingredients.push({amount: "", name: ""});
    };

}

function DeleteOppskriftCtrl($scope, Oppskrifter, $location, $routeParams) {
    $scope.oppskrift = Oppskrifter.get({id: $routeParams.id});
    $scope.deletePost = function () {
        $scope.oppskrift.$delete({id: $routeParams.id});
        $location.url('/');
    };

    $scope.home = function () {
        $location.url('/');
    };
}