angular.module("teambreweryApp").factory("Team", ["$http", "api", "$q", "Pokemon", function($http, api, $q, Pokemon){
    'use strict';

    var Team = function(data){
        this.tier = "OU";
        this.name = "Untitled " + Math.round(Math.random() * 10);
        // this.format_rules = Rules.byFormat("OU")... (for example)
        this.pokemons = [];
        this.id = null;
        this.private = false;
        this.populate = true;

        if (typeof data !== "undefined"){
            if (data.format && typeof data.format !== "undefined") this.tier = data.format.name;
            this.name = data.name;
            this.id = data.id;
            this.private = data.private;
            this.populate = data.populate_on_creation;
            var _this = this;
            _.map(data.pokemons, function(p){
                _this.pokemons.push(new Pokemon(p.pokemon, p));
            });
        }

        return this;
    };

    Team.getAll = function(){
        return $http.get(api('teams/list'));
    };

    Team.prototype.getMovesetCoverage = function(type, category){
        var count = 0;
        _.each(this.pokemons, function(p){
            if (typeof p.moveset !== "undefined"){
                _.each(p.moveset.moves, function(move){
                    if (move.type === type && move.category === category){
                        count++;
                    }
                });
            }
        });
        return count;
    };

    Team.prototype.getResistances = function(type){
        var count = 0;
        _.each(this.pokemons, function(pokemon){
          var multiplier = pokemon.typingDetails[type].multiplier;
          if (multiplier === 2 || multiplier === 5 || multiplier === 3){
            count++;
          }
        });
        return count;
      };

    Team.prototype.getWeaknesses = function(type){
        var count = 0;
        _.each(this.pokemons, function(pokemon){
          var multiplier = pokemon.typingDetails[type].multiplier;
          if (multiplier === 1 || multiplier === 4){
            count++;
          }
        });
        return count;
      };

    Team.create = function(team){
        return $http.post(api('teams/create'), team);
    }

    Team.getByID = function(id){
        return $http.get(api("team/" + id));
    }

    Team.prototype.save = function(){
        return $http.post(api('team/' + this.id + "/update"), {
            format: this.tier,
            pokemons: this.pokemons,
            private: this.private,
            name: this.name
        });
    }

    Team.prototype.addPokemon = function(pokemon){
        // if (this.format_rules["speciesClause"]){ if this.pokemons.indexOf(pokemon) > -1) return false; }
        // example on how to add format rules in the future.
        this.pokemons.push(pokemon);
    }

    Team.prototype.getPokemon = function(){
        return this.pokemons;
    }


    return Team;
}])