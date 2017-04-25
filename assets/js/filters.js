'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp.filters', ["ngRoute","myApp.services","chart.js"]);

app.filter('orderObjectBy', function(){

    return function(obj) {
        
        console.log(obj);

        if (!angular.isObject(obj)) return obj;

        var array = [];
        for(var item in obj) {
            console.log(item)
            array.push(item);
        }

        console.dir(array);
        array.sort(function(a, b){
            a = parseInt(a);
            b = parseInt(b);
            return b - a;
        });
        return array;
    }
    
});