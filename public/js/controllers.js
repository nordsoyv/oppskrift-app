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
        deleteStep($scope.form, index);
    };

    $scope.addStep = function () {
        addStep($scope.form);
    };

    $scope.deleteIngredient = function (index) {
        deleteIngredient($scope.form, index);
    };

    $scope.addIngredient = function () {
        addIngredient($scope.form);
    };

}

function EditOppskriftCtrl($scope, Oppskrifter, $location, $routeParams) {
    $scope.form = Oppskrifter.get({id: $routeParams.id});

    $scope.editPost = function () {
        $scope.form.$save({id: $routeParams.id});
        $location.url('/readPost/' + $routeParams.id);
    };

    $scope.deleteStep = function (index) {
        deleteStep($scope.form, index);
    };

    $scope.addStep = function () {
        addStep($scope.form);
    };

    $scope.deleteIngredient = function (index) {
        deleteIngredient($scope.form, index);
    };

    $scope.addIngredient = function () {
       addIngredient($scope.form);
    };
}


function deleteStep(oppskrift, index) {
    oppskrift.steps.splice(index, 1);
}

function addStep(oppskrift) {
    oppskrift.steps.push({});
}

function deleteIngredient(oppskrift, index) {
    oppskrift.ingredients.splice(index, 1);
}

function addIngredient(oppskrift) {
    oppskrift.ingredients.push({amount: "", name: ""});
}


function ReadOppskriftCtrl($scope, $routeParams, Oppskrifter) {
    $scope.oppskrift = Oppskrifter.get({id: $routeParams.id});
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