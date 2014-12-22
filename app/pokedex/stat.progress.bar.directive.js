angular.module("teambreweryApp").directive('statProgressBars', ['calcStat', function(calcStat){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: "app/pokedex/templates/stat.progress.bars.html",
            link: function(scope, element, attr){
                scope.pokemon = attr.pokemon;
            }
        }
    }])