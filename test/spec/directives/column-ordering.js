'use strict';

describe('Directive: orderingField', function () {

  // load the directive's module
  beforeEach(module('nodeDemoAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ordering-field></ordering-field>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the orderingField directive');
  }));
});
