'use strict';

angular.module('nodeDemoAppApp')
  .controller('ContactsCtrl', function ($scope, $http) {
    $http.get('/api/contacts').success(function(contacts) {
      $scope.contacts = contacts;
    });
  });
