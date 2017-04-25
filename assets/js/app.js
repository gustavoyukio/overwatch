'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.services',
  'myApp.controllers'
]).
run(['$rootScope', 'User', '$location', function($rootScope, User, $location){

    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        console.dir(User);
        if (!User.getLoggedStatus()) {
            console.log("Usuario nao logado");
            $location.path('/login');
        } else {
            console.log("Usuario Logado, nao fazer nada")
        }
    });

}]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');

  $routeProvider
  	
  	.when("/", {
  		templateUrl: "template/home.html",
  		controller: "HomeController"
  	})

  	.when("/adicionarJogo", {
  		templateUrl: "template/game/add.html",
      controller: "GameController"
  	})

    .when("/login", {
      templateUrl: "template/login/index.html",
      controller: "LoginController"
    })

  	.otherwise({redirectTo: '/login'});

}]);
