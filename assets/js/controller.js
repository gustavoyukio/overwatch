'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp.controller', ["ngRoute","myApp.services","chart.js"]);

app.controller('HomeController', ['$scope','Mock','Score','$timeout','ViewControl', function($scope,Mock,Score,$timeout,ViewControl){
 	
 	var checkEnterStatus = ViewControl.getInitial();
	$scope.series = ['SR'];
	$scope.labels = ['Start','Fim'];
	$scope.data   = ['0','4000'];
	$scope.showScoreInicial = false;

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

 	// Update do Grafico Necessario
  	Score.getScores(setGraphScore);


}])
app.controller('GameController', ['$scope','Mock','Heroes','Map','Score','Game', function($scope,Mock,Heroes,Map,Score,Game){
	
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
;