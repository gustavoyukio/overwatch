'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.services',
  'myApp.controller'
]).
run(['$rootScope','User',function($rootScope,User){
  
  /*
  if (User.getLoggedStatus) {

    location.href = '/#!/login';

    // Redirect to login
    $rootScope.$on('$routeChangeStart', function (event) {
      
      // Verify if user is logged
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        if (user.uid != null) {
          User.setLoggedStatus()  
          // Mais pra frente, guardar dados
        }
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      
    });

  }
  */

}]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');

  $routeProvider
  	
  	.when("/", {
  		templateUrl: "template/home.html",
  		controller: "HomeController",
      
      resolve: {
        app: function($q, $rootScope, $location, User) {
          
          var defer = $q.defer();
          
          if ($rootScope.loggedIn == false) {
            $location.path('/login');
          };
          
          defer.resolve();
          return defer.promise;

        }
      }

  	})

  	.when("/adicionarJogo", {
  		templateUrl: "template/game/add.html",
      controller: "GameController",
      resolve: {
        app: function($q, $rootScope, $location, User) {
          
          var defer = $q.defer();
          
          if (User.getLoggedStatus == false) {
            $location.path('/login');
          };
          
          defer.resolve();
          return defer.promise;

        }
      }
  	})

    .when("/login", {
      templateUrl: "template/login/notLogged.html",
      controller: "LoginController"
    })

  	.otherwise({redirectTo: '/'});

}]);
