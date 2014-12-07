angular.module("teambreweryApp").directive('pokemonCard', [function(){
       return {
            restrict: 'E',
            scope: true,
            replace: true,
            templateUrl: "app/pokemon/templates/card.html",
            link: function(scope, element, attrs){

            }
        }
    }
])