'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('answer', {
    url: '/answer/{pollId}',
    template: '<answer></answer>',
    controllerAs: 'user',
    authenticate: 'user'
  });
};
