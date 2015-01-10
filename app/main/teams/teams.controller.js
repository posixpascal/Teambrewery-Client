'use strict';

angular.module('teambreweryApp')
  .controller('TeamsController', function ($scope, $http, $state, Team) {
  	$scope.newTeam = {
  		name: "Untitled",
  		tier: "OU"
  	};

    $scope.teams = [];

    $scope.getTeamsPerPage = function(page){
      Team.getAll(page).success(function(teams){
        $scope.teams = _.map(teams.team, function(t){ return new Team(t); });
        console.log($scope.teams);
      });
    };

  	$scope.createTeam = function(){
  		Team.create($scope.newTeam).success(function(data){
  			$state.go('team', {id: data.team.id})
  		});
  	};

    $scope.load = function(){
      if ($state.includes('main.teams.list')) $scope.teams = $scope.getTeamsPerPage(0);
    };

    $scope.editTeam = function(team){
      $state.go('team', {id: team});
    };

    $scope.load();
  });
