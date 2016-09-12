
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './answer.routes';

export class AnswerController {

  /*@ngInject*/
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  $onInit() {

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

export default angular.module('pollPortalMeanApp.answer', [uiRouter])
  .config(routing)
  .component('answer', {
    template: require('./answer.html'),
    controller: AnswerController
  })
  .name;
