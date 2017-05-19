'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp.filters', ["ngRoute","myApp.services","chart.js"]);

app.filter('orderObjectBy', function(){

    return function(obj) {
        
        if (!angular.isObject(obj)) return obj;

        var array = [];
        for(var item in obj) {
            array.push(obj[item]);
        }

        array.sort(function(a, b){
            return a - b;
        });
        return array;
    }
    
});
