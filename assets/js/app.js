'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.services',
  'myApp.controllers',
  'ngCookies'
]).
run(['$rootScope', 'User', '$location', function($rootScope, User, $location){

    /*
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        if (!User.getLoggedStatus()) {
            $location.path('/login');
        }
        
    });
    */


}]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider
  	
  	.when("/", {
  		templateUrl: "template/home/index.html",
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
