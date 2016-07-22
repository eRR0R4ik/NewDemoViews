'use strict';
var groupApp = angular.module('groupApp', ["ngRoute",'ngAnimate']);
    groupApp.config(function($routeProvider){
        $routeProvider.when('/',
        {
            templateUrl:'views/groups.html',
            controller:'GroupListCtrl'
        });
        $routeProvider.when('/table',
        {
            templateUrl:'views/table.html',
            controller:'TableListCtrl'
        });
        $routeProvider.otherwise({redirectTo: '/'});
});
groupApp.controller('GroupListCtrl', function($scope, $http) {
	$http.get('data/groups.json').success(function(data, status, headers, config) {
		$scope.groups = data.groups;
        
        $scope.myFunc = function($event){
             $http.get('data/table.json').success(function(data, status, headers, config) {
              $scope.table = data.table;
        for(var i=0; i< $scope.table.length; i++) {
                   if ($scope.table[i].id == $event.currentTarget.attributes['data-id'].value) {
                    $scope.foundindex = i;
                }
            }
           
    });

        }

         $scope.getDay = function($event, date){
            $scope.date = date;
          
            for(var k=0; k< $scope.table[$scope.foundindex].days.length; k++) {
                if($scope.table[$scope.foundindex].days[k].date ==$scope.date){
                    console.log($scope.table[$scope.foundindex].days[k].date);
                        $scope.dday = k;
                         }
                     }
            
        }
       
	});
});

groupApp.directive('jqdatepicker', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            $(element).datepicker({
                dateFormat: 'DD',
                onSelect: function(date) {
                    ctrl.$setViewValue(date);
                    ctrl.$render();
                    scope.$apply();
                }
            });
        }
    };
});
// groupApp.controller('tableListCtrl', function($scope, $http) {
//     $http.get('data/table.json').success(function(data, status, headers, config) {
//         $scope.table = data.table;
//     });

// });


        