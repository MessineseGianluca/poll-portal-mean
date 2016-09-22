import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './show.routes';

export class ShowController {

  /*@ngInject*/
  constructor($http, $q, $stateParams, $window, Auth) {
    this.$http = $http;
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.$window = $window;
  }

  $onInit() {
    this.message = "That's a show page";
  }
}

export default angular.module('pollPortalMeanApp.show', [uiRouter])
  .config(routing)
  .component('show', {
    template: require('./show.html'),
    controller: ShowController
  })
  .name;
