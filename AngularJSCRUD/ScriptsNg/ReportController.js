var app = angular.module('myFormApp', []);
app.controller('ReportController', function ($scope, $http, $location, $window) {
    $scope.basic = 90;
    $scope.priority = 60;
    $scope.document = 20;
    $scope.company = 30;
    $scope.dept = 40;
    $scope.line = 50;
    $scope.depts = [{ dept: 'MM', basic: 3, priority: 1, document: 1, company: 2, colleague: 1, line: 4 }
                   , { dept: 'PM', basic: 2, priority: 2, document: 4, company: 2, colleague: 2, line: 3 }
                   , { dept: 'TM', basic: 4, priority: 2, document: 5, company: 2, colleague: 2, line: 8 }
                     , { dept: 'DOS', basic: 3, priority: 2, document: 3, company: 2, colleague: 1, line: 4 }];
    $scope.exporttoexcel = function () {
        $http({
            method: 'POST',
            url: 'Home/exporttoResult',
            data: $scope.Rating
        }).success(function (data, status, headers, config) {
            if (data.success === true) {
                $window.alert("Successfully export!");
            }
            else {
                $scope.message = 'Unexpected Error while doing the export!';
                console.log($scope.message);
            }
        }).error(function (data, status, headers, config) {
            $scope.message = 'Unexpected Error while doing export!' + data.errors;
            $scope.result = "color-red";
            console.log($scope.message);
        });
    }

})