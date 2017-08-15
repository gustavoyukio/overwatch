var app = angular.module('myApp.home.directives', ["ngRoute"]);

app.directive('homeClasses', function () {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            // concatenating the directory to the ver attr to select the correct excerpt for the day
            contentUrl = 'content/excerpts/hymn-' + attrs.ver + '.html';
        },
        // passing in contentUrl variable
        templateUrl: '/template/directive/geral.classes.html'
    }
})