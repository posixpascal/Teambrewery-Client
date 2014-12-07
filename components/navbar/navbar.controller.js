'use strict';

angular.module('teambreweryApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'TeamBuilder',
      'link': '/teambuilder'
    },
    {
        'title': 'All Teams',
        'link': '/team/all'
    },
    
    
    
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });