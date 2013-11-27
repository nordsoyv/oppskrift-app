'use strict';

/* Controllers */

function MainCtrl($scope) {
//    $scope.user = {email : "test@test.com"};
    $scope.loginInfo = {loggedIn: false};

    $scope.$on("loginEvent", function (event, args) {
        $scope.loginInfo.user = args.user;
        $scope.loginInfo.loggedIn = true;
    });

    $scope.$on("logoutEvent", function (event, args) {
        $scope.loginInfo.user = null;
        $scope.loginInfo.loggedIn = false;
    });
}

function LoginCtrl($scope, $dialog) {
    var opts = {
        backdrop: true,
        keyboard: true,
        backdropClick: false,
        templateUrl:  '/html/dialog/createUser.html',
        controller: 'LoginDialogController'
    };
    $scope.form = {};

    $scope.login = function () {
        var loginInfo = { user: $scope.form.email };
        $scope.$emit("loginEvent", loginInfo);
    };

    $scope.logout = function () {
        $scope.$emit("logoutEvent", {});
    };

    $scope.createUser = function(){
        var d = $dialog.dialog(opts);
        d.open().then(function(result){
            if(result.loggedIn){
                var loginInfo = { user: result.email };
                $scope.$emit("loginEvent", loginInfo);
            }
        });

    };
}

function LoginDialogController($scope, dialog){
    $scope.register = function(register){
        if(register){
            if($scope.form.password !== $scope.form.passwordRepeat){
                $scope.form.error = "Passord må matche";
                return;
            }
            dialog.close({loggedIn:true, email : $scope.form.email} );
        }else {
            dialog.close({ loggedIn:false, email :""} );
        }
    };
}


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
        newOppskrift.$save(function (savedOppskrift, putResponseHeaders) {
            $location.path('/readOppskrift/' + savedOppskrift[0]._id);
        });

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
        $location.url('/readOppskrift/' + $routeParams.id);
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