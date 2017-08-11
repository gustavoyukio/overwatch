'use strict';

var app = angular.module('myApp.loginController', ["ngRoute","myApp.services"]);

app.controller('LoginController', function($rootScope,$scope,User,$location,$cookies) {

	$rootScope.$broadcast('changeShowArrow',false);
	$rootScope.$broadcast('changeShowMenu',false);

	$scope.loginClass = function () {
		$scope.loginClass = 'login-wrapper';
	}

	var logIn = function (valor) {
		if (valor == true || valor) {
			$scope.loginClass = '';
			$rootScope.telaDeLogin = 'abacate';
			//$rootScope.$broadcast('abacate',true);
			$location.path('/');
			if (!$scope.$$phase) {
				$scope.$apply();
			}
		}
	}

	var googleLogin = function () {

		firebase.auth().signInWithPopup(provider).then(function(result) {
	        // This gives you a Google Access Token. You can use it to access the Google API.
	        var token = result.credential.accessToken;
	        // The signed-in user info.
	        var user = result.user;

	        if (user.uid != null) {

	        	$cookies.put('user', user.uid);
        		$cookies.put('userName', user.displayName);

	          	User.setLoggedStatus(user, logIn);  
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

	if ($cookies.get('user') != undefined && $cookies.get('userName') != undefined) {
		
		var user = {};
		user.uid = $cookies.get('user');
		user.name = $cookies.get('userName');

		User.setLoggedStatus(user, logIn);
		$rootScope.telaDeLogin = 'abacate';
		$location.path('/');

	} else {
		googleLogin();
	}


})