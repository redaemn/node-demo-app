'use strict';

angular.module('nodeDemoAppApp')
  .controller('ContactsListCtrl', function ($scope, ContactsData, $rootScope) {
    
    $scope.contacts = [];
    $scope.totalContacts = 0;

    $scope.count = 5;
    $scope.counts = [5, 10, 20];
    
    $scope.page = 1;
    $scope.orderByField = 'surname';
    $scope.orderByDirection = 1;

    function updateContactList() {
      var orderBy = {};

      orderBy[$scope.orderByField] = $scope.orderByDirection;

      $rootScope.$emit('contacts-list-updated');

      ContactsData.getAll({
        page: $scope.page,
        count: $scope.count,
        orderBy: orderBy
      }).success(function(contactsData) {
        $scope.contacts = contactsData.data;
        $scope.totalContacts = contactsData.count;
      });
    }

    $scope.$watch('count', updateContactList);
    $scope.$watch('page', updateContactList);
    $scope.$watch('orderByField', updateContactList);
    $scope.$watch('orderByDirection', updateContactList);

    $scope.selectContact = function (contact) {
      $rootScope.$emit('contacts-select', { contact : contact })
    };

    $rootScope.$on('contacts-updated', updateContactList);

  });
