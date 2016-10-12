import angular from 'angular';
import routing from './modify.routes';
import uiRouter from 'angular-ui-router';

export class ModifyController {
  /*@ngInject*/
  constructor($http, $state, $window) {
    // Use the User $resource to fetch all users
    this.$http = $http;
    this.$window = $window;
    this.$state = $state;
  }

  $onInit() {

  }
}

export default angular.module('pollPortalMeanApp.modify', [uiRouter])
  .config(routing)
  .component('modify', {
    template: require('./modify.html'),
    controller: ModifyController
  })
  .name;
