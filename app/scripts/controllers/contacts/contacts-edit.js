'use strict';

angular.module('nodeDemoAppApp')
  .controller('ContactsEditCtrl', function ($scope, ContactsData, $rootScope) {
    
    function clearContact () {
      $scope.editingContact = {};
    }

    $scope.clearContact = clearContact;

    function editContact (event, args) {
      angular.copy(args.contact, $scope.editingContact);
    }

    $scope.updateContact = function () {
      ContactsData.update($scope.editingContact)
      .success(function() {
        $rootScope.$emit('contacts-updated');
      });
    };

    $rootScope.$on('contacts-select', editContact);
    $rootScope.$on('contacts-list-updated', clearContact);

    clearContact();

  });
