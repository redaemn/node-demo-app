'use strict';

angular.module('nodeDemoAppApp')
  .directive('columnOrdering', function () {
    
    var DESC = "desc",
      ASC = "asc";

    return {
      template: '<span ng-click="triggerOrdering()">' +
        '<span ng-transclude></span>' +
        '<span ng-show="showAsc()">&#x25b2;</span>' +
        '<span ng-show="showDesc()">&#x25bc;</span>' +
      '</span>',
      transclude: true,
      restrict: 'A',
      scope: {
        fieldName: "@",
        field: "=",
        direction: "="
      },
      link: function postLink($scope, $element, $attrs) {
        $element.css('cursor', 'pointer');

        $scope.triggerOrdering = function () {
          if ($scope.fieldName !== $scope.field) {
            $scope.field = $scope.fieldName;
          }
          else {
            if ($scope.direction == ASC) {
              $scope.direction = "desc";
            }
            else {
              $scope.direction = ASC;
            }
          }
        };

        $scope.showAsc = function () {
          return $scope.field === $scope.fieldName && $scope.direction === ASC;
        };

        $scope.showDesc = function () {
          return $scope.field === $scope.fieldName && $scope.direction === DESC;
        };
      }
    };
  });
