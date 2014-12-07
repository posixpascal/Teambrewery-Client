'use strict';

angular.module('teambreweryApp')
  .controller('TeamCtrl',['$scope', '$http', 'Pokemon', '$stateParams', '$modal', '$rootScope', 'typeChart', 'Team', 'text2team', function ($scope, $http, Pokemon, $stateParams, $modal, $rootScope, typeChart, Team, text2team) {
      $scope.team = []; 
      $scope.types = Object.keys(typeChart);
    
     
      $scope.saveSettings = function(s){
          $scope.settings = angular.copy(s);
          $.jStorage.set('settings', $scope.settings);
      }
      $scope.load = function(){
          console.log("TeamController loaded");
      }
    
      $scope.init = function(){
          var default_settings = {
              typeChart: {
                  showPokemon: true,
                  tableMode: "types",
                  rows: {
                      immunity: true,
                      neutral: true,
                      effective: true,
                      superEffective: true,
                      resistant: true,
                      quadResistant: true
                  },
              }
          }
          
          $scope.settings = $.jStorage.get('settings', default_settings);
          $scope.customSettings = angular.copy($scope.settings);
          
          $scope.$watch(function(){
              return $scope.team.length;
          }, $scope.getTeamWeakness);
          
          if ($stateParams.id){ 
              $http.get('/api/team/get/' + $stateParams.id).success(function(data){
                  $scope.team = JSON.parse(data[0].team);
              });
          }
          
          else {
              $scope.randomizeTeam();
              
          }
      }
      
      $scope.randomizeTeam = function(){
          $scope.team = [];
          for (var i = 0; i < 6; i++){
              Pokemon.getRandomOU().success(function(data){
                  $scope.team.push(new Pokemon(data.pokemon));
              });
          }
          
      }
      
      $scope.clearTeam = function(){
          $scope.team = [];
      }
      
      $scope.importTeam = function(){
          
          $scope.importModal = $modal.open({
            templateUrl: 'components/modal/team.import.modal.html',
            windowClass: "modal-default",
            scope: $scope
          });
              

      }
      
      $scope.addPokemon = function(){

          var modalScope = $rootScope.$new();
          
          var scope = {
              getPokemonByName: function(name){
                  return $http.get("/api/pokemon/by-name/" + name).then(function(res){
                      return res.data;
                  });
              },
              addPokemon: function(pokemon){
                  $scope.team.push(pokemon);
                  $scope.$theModal.close();
                  
              }
          }
          scope.setActivePokemon = function($item, $model, $label){
               modalScope.activePokemon = $model;
          };
          
          angular.extend(modalScope, scope);
          $scope.$theModal =  $modal.open({
            templateUrl: 'components/modal/pokemon.add.modal.html',
            windowClass: "modal-default",
            scope: modalScope
          });
      }
  
      $scope.saveTeam = function(){
          Team.save($scope.team);
      }
      
      $scope.teamWeaknesses = function(type){
          if ($scope.weakness){
              var typeWeakness = $scope.weakness[type];
              return _.flatten([typeWeakness.effective, typeWeakness.superEffective])
                  
          } else {
              $scope.getTeamWeaknesses();
              return $scope.teamWeaknesses(type);
          }
      }
      $scope.teamResistance = function(type){
          if ($scope.weakness){
              var typeWeakness = $scope.weakness[type];
              return _.flatten([typeWeakness.resist, typeWeakness.quadResist])
                  
          } else {
              $scope.getTeamWeaknesses();
              return $scope.teamResistance(type);
          }
      }
      
      $scope.teamImmunities = function(type){
          if ($scope.weakness){
              var typeWeakness = $scope.weakness[type];
              return typeWeakness.immunity;
                  
          } else {
              $scope.getTeamWeaknesses();
              return $scope.teamImmunities(type);
          }
      }
            //
      // $scope.getWeaknessesFor = function(pokemon){
      //     var weaknesses = {};
      //
      //     var types = [];
      //     types.push(pokemon.types[0]);
      //     if (typeof pokemon.types[1] !== "undefined") types.push(pokemon.types[1]);
      //     else types.push('Bird');
      //
      //     angular.forEach(types, function(pokeType){
      //         if (pokeType == 'Bird') return; // luls. bird.
      //         angular.forEach(Object.keys(typeChart[pokeType].damageTaken), function(theType){
      //             var weaknessLevel = typeChart[pokeType].damageTaken[theType];
      //             if (weaknessLevel == 1){
      //                 weaknesses[theType] = true;
      //             }
      //         });
      //     });
      //
      //
      //     var realWeaknesses = [];
      //
      //     // premodify weakness object, because types overwrite each other. so we have to check that.
      //     angular.forEach(Object.keys(weaknesses), function(weaknessType){
      //
      //         var isRealWeakness = true;
      //
      //         angular.forEach(types, function(pokeType){
      //             var damageTaken = typeChart[pokeType].damageTaken[weaknessType];
      //             if (damageTaken >= 2){
      //                 isRealWeakness = false;
      //             }
      //         });
      //
      //         if (isRealWeakness){
      //             realWeaknesses.push(weaknessType);
      //         }
      //     });
      //
      //
      //     return realWeaknesses;
      //
      // }
      //
      // $scope.getTeamWeakness = function(){
      //     var weakness = {};
      //
      //     // for each type:
      //     angular.forEach(Object.keys(typeChart), function(type){
      //         weakness[type] = {
      //             immunity: [],
      //             quadResist: [],
      //             resist: [],
      //             neutral: [],
      //             effective: [],
      //             superEffective: []
      //         };
      //
      //         // for each pokemon in team
      //         angular.forEach($scope.team, function(pokemon){
      //             pokemon = pokemon;
      //             var types = [];
      //             console.log(pokemon.getTyping());
      //
      //             types.push(pokemon.getTyping()[0]);
      //             if (typeof pokemon.getTyping()[1] !== "undefined") types.push(pokemon.types[1]);
      //             else types.push('Bird');
      //
      //
      //             var type1 = (typeChart[types[0]].damageTaken[type]);
      //             var type2 = (typeChart[types[1]].damageTaken[type]);
      //             var immunity = (type1 == 3 || type2 == 3)
      //
      //            // check for immunity:
      //            if (immunity){
      //                weakness[type]['immunity'].push(pokemon);
      //            }
      //
      //            // check for quad resist
      //            if ( !immunity && (
      //                type1 == 2 &&
      //                type2 == 2)
      //            ) weakness[type]['quadResist'].push(pokemon);
      //
      //            // resist
      //            var resistent = false;
      //            if ( !immunity && (
      //                (type1 == 2 && type2 == 0) ||
      //                (type2 == 2 && type1 == 0))) resistent = true;
      //
      //            if (resistent)
      //                    weakness[type]['resist'].push(pokemon);
      //
      //            // neutral
      //            var neutral = (type1 == 0 && type2 == 0);
      //            if ( !immunity &&
      //                (type1 == 0 && type2 == 0)
      //            ) weakness[type]['neutral'].push(pokemon);
      //
      //
      //            // check for super effective
      //            if ( !immunity &&
      //                (type1 == 1 && type2 == 1)
      //            ) weakness[type]['superEffective'].push(pokemon);
      //
      //            // effective
      //            if ( !immunity && (
      //                (type1 == 1 && type2 == 0) ||
      //                (type2 == 1 && type1 == 0))
      //            ) weakness[type]['effective'].push(pokemon);
      //
      //         });
      //     });
      //
      //
      //     $scope.weakness = weakness;
      // }


      
      
      $scope.load();
  }]);
