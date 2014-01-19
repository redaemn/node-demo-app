'use strict';

describe('Service: ContactsData', function () {

  // load the service's module
  beforeEach(module('nodeDemoAppApp'));

  // instantiate service
  var ContactsData;
  beforeEach(inject(function (_ContactsData_) {
    ContactsData = _ContactsData_;
  }));

  it('should do something', function () {
    expect(!!ContactsData).toBe(true);
  });

});
