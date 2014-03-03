'use strict';

angular.module('nodeDemoAppApp')
  .service('ContactsData', function ContactsData($http) {
    
    /*var contacts = $resource('/api/contacts', {}, {
      query: {
        method: 'GET',
        isArray: false,
        params: {
          page: 1,
          count: 5,
          orderBy: { field: 'id', direction: 'asc' }
        }
      }
    });

    return {
      getAll: contacts.query
    };*/

    var defaultParams = {
      page: 1,
      count: 5,
      orderBy: { '_id': 1 }
    };

    return {
      getAll: function (params) {
        return $http.get('/api/contacts', {
          params: angular.extend({}, defaultParams, params)
        });
      },
      update: function (contact) {
        return $http.post('/api/contacts', contact);
      }
    };

  });
