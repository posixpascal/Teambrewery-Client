'use strict';

angular.module('teambreweryApp')
  .controller('TeamCtrl', function ($scope, $http, Pokemon, $state, $stateParams, $modal, $rootScope, typeChart, Team, text2team, Toaster, api) {
      $scope.team = new Team(); 
      $scope.types = Object.keys(typeChart);
      

      $scope.saveSettings = function(s){
          $scope.settings = angular.copy(s);
          $.jStorage.set('settings', $scope.settings);
      };

      $scope.load = function(){
          console.log("TeamController loaded");
           if ($stateParams.id){ 

              Team.getByID($stateParams.id).success(function(team){

                  $scope.team = new Team(team.team);

                  if ($scope.team.populate && $scope.team.pokemons.length == 0){
                    $scope.randomizeTeam();
                  }

                  if ($scope.team.pokemons.length > 0){
                    _.map($scope.team.pokemons, function(p){
                      return new Pokemon(p);
                    });
                  }
              });
          }
          
          else {
              $scope.randomizeTeam();
              
          }
      };
      
      $scope.showTeam = function(){
        $state.go('teambuilder', {id: $scope.team.id || ""});

      };




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
          
         
      };

      $scope.randomizeTeam = function(){
          $scope.team.pokemons = [];
          for (var i = 0; i < 6; i++){
              Pokemon.getRandomByFormat($scope.team.tier).success(function(data){
                $scope.team.pokemons.push(new Pokemon(data.pokemon));
              });
          }    
      };


      $scope.saveTeam = function(){
        $scope.team.save().success(function(){
          Toaster.success("Team successfully saved!");
        });
      };

      $scope.importTeam = function(){
          
          $scope.importModal = $modal.open({
            templateUrl: 'components/modal/team.import.modal.html',
            windowClass: "modal-default",
            scope: $scope
          });
              

      };

      $scope.addPokemonsCollection = [];
      $scope.addPokemonServer = function(tableState, tableController){
        $http.get(api("/pokemon/autocomplete/" + tableState.search.predicateObject.$)).success(function(p){
          $scope.addPokemonsCollection = [];
          _.each(p.pokemon, function(pokemon){
            $scope.addPokemonsCollection.push(new Pokemon(pokemon));
          });
        });
      };

      $scope.clearTeam = function(){
        $scope.team.pokemons = [];
      };


      $scope.addPokemonIsLoading = false;

      $scope.addPokemon = function(data){
        if (typeof data !== "undefined" && typeof data.pokemon !== "undefined"){
          // add pokemon to db
          $scope.team.pokemons.push(data.pokemon);
          $scope.addPokemonModal.close();
          return;
        }
        $scope.addPokemonIsLoading = true;
        if (typeof data === "undefined"){
          $http.get(api("pokemon/all")).success(function(p){
            $scope.addPokemonsCollection = [];
            _.each(p.pokemons, function(pokemon){
              $scope.addPokemonsCollection.push(new Pokemon(pokemon));
              
            });
            $scope.addPokemonIsLoading = false;
          });
          return $scope.addPokemonModal = $modal.open({
            templateUrl: 'components/modal/pokemon.add.modal.html',
            windowClass: "modal-pokemon",
            scope: $scope,
            size: "lg"
          });


          //return $state.go('teambuilder.pokemons');
        } 

        var stateOptions = {
          group: (typeof data["format"] === "undefined") ? "group" : "format",
          query: data[_.keys(data)[0]]
        };

        $scope.addPokemonModal = $modal.open({
          templateUrl: 'components/modal/pokemon.add.modal.html',
          windowClass: "modal-default",
          scope: $scope,
          size: "lg"
        });
        if (stateOptions.group === "format") {
          $http.get(api("pokemons/format/" + data["format"])).success(function(data){
            $scope.addPokemonsCollection = [];
            _.each(data.pokemon, function(pokemon){
              $scope.addPokemonsCollection.push(new Pokemon(pokemon));
            });
            $scope.addPokemonIsLoading = false;
          });
        }

        //$state.go('teambuilder.pokemons.list', stateOptions);
      };

      $scope.getPokemonByName = function(name){
        return $http.get(api("/pokemon/autocomplete/" + name)).success(function(data){
          return data.pokemon;
        });
      };
      
      /**
      
      
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


      
      */
      $scope.load();
  });
