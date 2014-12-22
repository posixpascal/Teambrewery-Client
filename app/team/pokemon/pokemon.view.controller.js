'use strict';

angular.module('teambreweryApp')
  .controller('PokemonViewCtrl', function ($scope, $http, Pokemon, $state, $stateParams, $modal, $rootScope, typeChart, Team, text2team) {
      $scope.pokemons = [];
      $scope.currentPage = 1;
      $scope.totalPages = 0;


      $scope.load = function(){
        $scope.initPagination();
      }

      $scope.pageChanged = function() {
        $scope.initPagination();
      };

      $scope.initPagination = function(){
        Pokemon.getAll($scope.currentPage).success(function(data){

          $scope.currentPage = data.page;
          $scope.totalPages = data.total;
          $scope.totalPokemon = data.totalPokemons;

          $scope.pokemons = _.map(data.pokemons, function(p){ return new Pokemon(p); });

        });
      }

      $scope.load();
  });
