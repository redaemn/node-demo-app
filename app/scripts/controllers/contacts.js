'use strict';

angular.module('nodeDemoAppApp')
  .controller('ContactsCtrl', function ($scope, ContactsData) {
    
    $scope.contacts = [];
    $scope.count = 5;
    $scope.counts = [5, 10, 20];
    $scope.page = 1;
    $scope.totalContacts = 0;

    function updateContacts() {
      ContactsData.getAll({
        page: $scope.page,
        count: $scope.count
      }).success(function(contactsData) {
        $scope.contacts = contactsData.data;
        $scope.totalContacts = contactsData.count;
      });
    }

    $scope.$watch('count', updateContacts);
    $scope.$watch('page', updateContacts);

  });
