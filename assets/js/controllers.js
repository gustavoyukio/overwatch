'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp.controllers', ["ngRoute","myApp.services","chart.js","myApp.filters"]);

app.controller('NavController', ['$rootScope', '$scope', function ($rootScope, $scope) {
	

}])

app.controller('MenuController', ['$scope', function($scope) {
}])

app.controller('HomeController', ['$scope','ViewControl','User','Score','Home', function($scope,ViewControl,User,Score,Home){
 	
 	var checkEnterStatus = ViewControl.getInitial();
	$scope.series = ['SR'];
	$scope.labels = ['Start','Fim'];
	$scope.data   = ['0','4000'];
	$scope.showScoreInicial = false;
	console.dir(User);

	$scope.onClick = function (points, evt) {
    	// Acao quando Clicar
  	};
  	$scope.datasetOverride = [{ yAxisID: 'abacate' }, {}];
  	$scope.options = {
    	scales: {
      		yAxes: [
        		{
					id: 'abacate',
					type: 'linear',
					display: true,
					position: 'right'
				}
      		]
    	}
  	};	

 	var setGraphScore = function (valores) {

 		if (valores != undefined ) {

	 		$timeout(function(){

			  	var a = [];
			  	
			  	$scope.labels.splice(0,2);
			  	$scope.data.splice(0,2);

		 		for (var i=0; i < valores.length; i++) {
		 			$scope.labels.push(i);
		 			a.push(valores[i]);
		 		}

		 		$scope.data.push(a);

			}, 200);

 		}		
 	}

  	var scoreInicialCallback = function (value) {
  		$scope.scoreInicialValue = value;
  		$scope.showScoreInicial = true;
  	} 	
  	$scope.setScoreInicial = function () {
  		Score.setScoreInicial($scope.scoreInicialValue, scoreInicialCallback);
  	}
  	var getScoreInicial = function () {
  		Score.getScoreInicial(scoreInicialCallback);
  	}

	if (!checkEnterStatus) {
		$scope.series = ['SR'];
		$scope.labels = ['Start','Fim'];
		$scope.data   = ['0','4000'];
		$scope.showScoreInicial = false;
		getScoreInicial();
	  	ViewControl.setInitial();
 	}

 	var HeroesNeverDieCallback = function (data) {
 		$scope.HeroesNeverDie = data;
 	}

 	Home.heroesNeverDie(HeroesNeverDieCallback);
  	Score.getScores(setGraphScore);
  	
}])

app.controller('GameController', ['$scope', function($scope){
	
	$scope.startHour = "00:00";
	$scope.heroList = [];
	$scope.showMsg = false;
	$scope.SrInicial = Score.getScore();

	var hour = 0;

	var getHorario = function () {
		
		var a = new Date();
		
		hour = (a.getHours()<10?'0':'') + a.getHours();
		var minutes = (a.getMinutes()<10?'0':'') + a.getMinutes();
		// function to set hour to game
		$scope.startHour = hour+':'+minutes;

	}

	getHorario();

	// select to choose hero
	$scope.optionsHero = Heroes.getHeroes();
	$scope.optionsMaps = Map.getMaps();

	// adicionar hero
	$scope.adicionarHero = function () {

		if(
			$scope.heroList.indexOf( $scope.HeroSelecionado ) == -1 ||
			$scope.HeroSelecionado != undefined
		){
			$scope.heroList.push($scope.HeroSelecionado);
			Game.setHeroes($scope.HeroSelecionado);
		}
		
	}

	$scope.salvarJogo = function () {
		
		//verify
		if (verifyForm()) {

			Game.setMap($scope.MapaSelecionado);
			Game.setScore($scope.SrFinal);
			Game.setHour(hour);
			Game.saveEntry(resetarForm);

		} else {
			console.log("Entradas Erradas")	
		}
		
	}

	var verifyForm = function () {
		
		var retorno = true;
		if (
			$scope.MapaSelecionado == undefined || 
			$scope.MapaSelecionado == null || 
			$scope.SrFinal == undefined || 
			$scope.SrFinal == null
			) 
		{
			retorno = false;
		}
		return retorno;
	}

	var resetarForm = function (msg) {

		console.log("Resetar Form");
		$scope.msg 	   = msg;
		$scope.showMsg = 'active';

	}
	
}])

app.controller('LoginController', ['$scope','User','$location', function($scope,User,$location) {

	if (User.getLoggedStatus()) {
		console.log("Usuario Logado, redirecionar")
        $location.path('/!#/');
    }

	var logIn = function (valor) {
		console.log("Valor vindo do resultado do callback = " + valor);
		if (valor == true || valor) {
			console.log("Redirecionar ele pra home");
			$location.path('/!#/');
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
	        console.log("OI");
	    });

	}
    
}])
;