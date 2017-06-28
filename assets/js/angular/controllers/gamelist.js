'use strict';

var app = angular.module('myApp.GameListController', ["ngRoute","myApp.services"]);

app.controller('GameListController', function($rootScope,$scope,Game){

	//$rootScope.$broadcast('changeShowArrow',true);
	
	var getGamesCallback = function (val) {

		$scope.gameList = val.reverse();
		
		if (!$scope.$$phase) {
			$scope.$apply();
		}

	}

	Game.getGamesList(getGamesCallback);

})