'use strict';

var app = angular.module('myApp.loginController', ["ngRoute","myApp.services"]);

app.controller('LoginController', ['$rootScope', '$scope','User','$location', function($rootScope,$scope,User,$location) {

	$rootScope.$broadcast('changeShowArrow',false);
	$rootScope.$broadcast('changeShowMenu',false);

	$scope.loginClass = function () {
		$scope.loginClass = 'login-wrapper';
	}

	if (User.getLoggedStatus()) {

        $location.path('/adicionarJogo');

    } else {

	    var logIn = function (valor) {
			if (valor == true || valor) {
				$rootScope.$broadcast('abacate',true);
				if (!$scope.$$phase) {
					$location.path('/');
					$scope.$apply();
				}
			}
		}

    }

	

	$scope.googleLogin = function () {

		firebase.auth().signInWithPopup(provider).then(function(result) {
	        // This gives you a Google Access Token. You can use it to access the Google API.
	        var token = result.credential.accessToken;
	        // The signed-in user info.
	        var user = result.user;

	        if (user.uid != null) {
	          	User.setLoggedStatus(user, logIn)  
	          	// Mais pra frente, guardar dados
	          	//$location.path('/adicionarJogo');
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
	        console.dir(error);
	    });

	}
}])