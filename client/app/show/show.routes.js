'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('show', {
    url: '/show/:pollId',
    template: '<show></show>',
    controllerAs: 'user',
    authenticate: 'user'
  });
};
