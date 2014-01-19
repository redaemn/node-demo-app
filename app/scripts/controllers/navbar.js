'use strict';

angular.module('nodeDemoAppApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Contacts',
      'link': '/contacts'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
