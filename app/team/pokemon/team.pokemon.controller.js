'use strict';

angular.module('teambreweryApp')
  .controller('TeamPokemonController', function ($scope, $stateParams){
     $scope.load = function(){
      if (typeof $stateParams.index !== "undefined"){
        $scope.pokemon = $scope.$parent.team.pokemons[$stateParams.index];
      }
     };

     $scope.load();
  });
