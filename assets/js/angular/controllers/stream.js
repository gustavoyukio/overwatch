'use strict';

var app = angular.module('myApp.StreamController', ["ngRoute","myApp.services"]);

app.controller('StreamController', function($scope){

    $scope.streamers = [
        {name: "TheKinobi", role: "Support", platform:'Twitch', url:"https://www.twitch.tv/thekinobi"},
        {name: "BigodeAoki", role: "Support", platform:'Twitch', url:"https://www.twitch.tv/bigodeaoki"},
    ];
    
});