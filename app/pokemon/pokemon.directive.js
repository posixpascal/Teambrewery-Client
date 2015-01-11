"use strict";
angular.module("teambreweryApp")
    .directive('pokemonTyping', [
        function() {
            return {
                restrict: 'E',
                scope: true,
                replace: true,
                templateUrl: "app/pokemon/templates/pokemon.typing.html",
                link: function(scope, element, attrs) {
                    if (attrs.pokemon) {
                        scope.pokemon = attrs.pokemon;

                    }
                }
            };
        }
    ])
    .directive('pokemonEvspread', [
        function(){
            return {
                restrict: 'E',
                scope: true,
                replace: true,
                templateUrl: 'app/pokemon/templates/pokemon.evspread.html',
                link: function(scope, element, attrs){
                    if (attrs.pokemon){
                        scope.pokemon = attrs.pokemon;
                    }
                }
            };
        }
    ])
    .directive('pokemonMoves', [
        function(){
            return {
                restrict: 'E',
                scope: true,
                replace: true,
                templateUrl: 'app/pokemon/templates/pokemon.moves.html',
                link: function(scope, element, attrs){
                    if (attrs.pokemon){
                        scope.pokemon = attrs.pokemon;
                    }
                }
            };
        }
    ])


;