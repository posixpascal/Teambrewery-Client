angular.module("teambreweryApp")
   .directive('pokemonTyping', [function(){
        return {
            restrict: 'E',
            scope: true,
            replace: true,
            templateUrl: "app/pokemon/pokemon.types.html",
            link: function(scope, element, attrs){
                if (attrs.pokemon) {
                    scope.pokemon = attrs.pokemon;
                    console.log(scope.pokemon.types);
                }
            }
        }
    }])
    
    ;