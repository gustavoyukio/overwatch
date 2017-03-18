'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.services',
  'myApp.controller'
]).
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

  	.otherwise({redirectTo: '/'});

}]);
