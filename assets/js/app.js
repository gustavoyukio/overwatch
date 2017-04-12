'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.services',
  'myApp.controller'
]).
run(['$rootScope','User',function($rootScope,User){
  
  $rootScope.$on('$routeChangeStart', function (event) {
    
    // Verify if user is logged
    console.log("oi amores");
    console.log( User.returnStatus() );
    
  })

}]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  
  console.dir($routeProvider);

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
