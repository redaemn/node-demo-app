'use strict';

angular.module('nodeDemoAppApp')
  .controller('ContactsCtrl', function ($scope, ContactsData) {
    
    $scope.contacts = [];
    $scope.totalContacts = 0;

    $scope.count = 5;
    $scope.counts = [5, 10, 20];
    
    $scope.page = 1;
    $scope.orderByField = 'surname';
    $scope.orderByDirection = 1;

    function updateContacts() {
      var orderBy = {};

      orderBy[$scope.orderByField] = $scope.orderByDirection;

      ContactsData.getAll({
        page: $scope.page,
        count: $scope.count,
        orderBy: orderBy
      }).success(function(contactsData) {
        $scope.contacts = contactsData.data;
        $scope.totalContacts = contactsData.count;
      });
    }

    $scope.$watch('count', updateContacts);
    $scope.$watch('page', updateContacts);
    $scope.$watch('orderByField', updateContacts);
    $scope.$watch('orderByDirection', updateContacts);

  });
