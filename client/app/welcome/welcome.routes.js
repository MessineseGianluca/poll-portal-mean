'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('welcome', {
    url: '/',
    template: '<welcome></welcome>'
  });
};
