angular.module("teambreweryApp").directive('weaknessTable', [function(){
           return {
                restrict: 'E',
                scope: true,
                replace: true,
                templateUrl: "app/team/templates/weakness_table.html",
                link: function(scope, element, attrs){
                    console.log(attrs.team);
                }
            }
        }
    ])