'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('modify', {
    url: '/admin/modify/:pollId',
    template: '<modify></modify>',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
};
