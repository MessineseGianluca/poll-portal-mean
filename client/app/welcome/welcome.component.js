import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './welcome.routes';

export class WelcomeController {

  /*@ngInject*/
  /*constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
      });
  }

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

export default angular.module('pollPortalMeanApp.main', [uiRouter])
  .config(routing)
  .component('welcome', {
    template: require('./welcome.html'),
    controller: WelcomeController
  })
  .name;
