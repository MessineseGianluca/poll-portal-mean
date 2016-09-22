import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './show.routes';

export class ShowController {

  /*@ngInject*/
  constructor($http, $q, $stateParams, $window) {
    this.$http = $http;
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.$window = $window;
  }

  $onInit() {
    this.$http.get('/api/polls/' + this.$stateParams.pollId)
      .then(response => {
        this.poll = response.data;
      });
  }
}

export default angular.module('pollPortalMeanApp.show', [uiRouter])
  .config(routing)
  .component('show', {
    template: require('./show.html'),
    controller: ShowController
  })
  .name;
