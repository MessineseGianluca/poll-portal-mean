
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './dashboard.routes';

export class DashboardController {

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/polls')
      .then(response => {
        //console.log(response.data);
        this.polls = response.data;
      });
  }
/*
  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }*/
}

export default angular.module('pollPortalMeanApp.dashboard', [uiRouter])
  .config(routing)
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: DashboardController
  })
  .name;
