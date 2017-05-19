'use strict';

var app = angular.module('myApp.loginController', ["ngRoute","myApp.services"]);

app.controller('GameController', function($rootScope,$scope,Score,Heroes,Map,Game,$location,$cookies){

	$rootScope.$broadcast('changeShowArrow',true);
	$scope.number = 6;

	var verifyForm = function () {
		
		var retorno = true;

		if ($scope.SrFinal == undefined || $scope.SrFinal == null ){
			retorno = false;
		}
			
		return retorno;
	}

	var resetarForm = function (msg) {

		$scope.msg 	   = msg;
		$scope.showMsg = 'active';

		if (!$scope.$$phase) {
			$location.path('/');
			$scope.$apply();
		}
	}

	var getHorario = function () {
		
		var a = new Date();
		
		hour = (a.getHours()<10?'0':'') + a.getHours();
		var minutes = (a.getMinutes()<10?'0':'') + a.getMinutes();

		var day 	= (a.getDate() < 10 ? '0' : '' ) + a.getDate();
		var month 	= (a.getMonth() < 10 ? '0' : '') + a.getMonth();

		$scope.startHour = hour+':'+minutes;
		$scope.startDate = day+'/'+month;
	}

	var hour = 0;

	$scope.startHour 	= "00:00";
	$scope.heroList 	= [];
	$scope.showMsg 		= false;
	$scope.SrInicial 	= Score.getScore();
	$scope.optionsHero 	= Heroes.getHeroes();
	$scope.optionsMaps 	= Map.getMaps();
	$scope.teamSR		= 0;
	$scope.enemySR		= 0;

	getHorario();

	$scope.adicionarHero = function (a) {

		if ($scope.heroList.indexOf( $scope.HeroSelecionado ) == -1 || $scope.HeroSelecionado != undefined) {
			$scope.heroList.push(JSON.parse($scope.HeroSelecionado));
			Game.setHeroes($scope.HeroSelecionado);
		}	
	}

	$scope.salvarJogo = function () {
		
		if (verifyForm()) {

			console.log("Entrada Corretas");
			Game.setPartySize($scope.partySize);
			Game.setSRs($scope.teamSR,$scope.enemySR);
			Game.setMap($scope.MapaSelecionado);
			Game.setScore($scope.SrFinal);
			Game.setHour(hour);
			Game.saveEntry(resetarForm);

		} else {
			console.log("Entradas Erradas")	
		}
	}
	
	$scope.SRs = function () {

		var a = $scope.teamSR;
		var b = $scope.enemySR;
	}

	$scope.startForm = function () {
		Game.resetGameObject();
	}

	// Verificando Cookies
	if ($cookies.get("party") != undefined ) {
		$scope.partySize = $cookies.get("party");
		if (!$scope.$$phase) {
  			$scope.$apply();
  		}
	}
	
})