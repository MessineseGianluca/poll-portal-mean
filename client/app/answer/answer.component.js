import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './answer.routes';

export class AnswerController {

  /*@ngInject*/
  constructor($http, $q, $stateParams, $window) {
    this.$http = $http;
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.$window = $window;
  }

  $onInit() {
    this.$q.all([
      this.$http.get('/api/polls/' + this.$stateParams.pollId),
      this.$http.get('/api/users/me'),
    ])
      .then(response => {
        var pollToAnswer = response[0].data;
        var pollsAnsweredByUser = response[1].data.polls;
        for(var pollId of pollsAnsweredByUser) {
          if(pollId == pollToAnswer._id)
            this.$window.location.href = '/dashboard';
        }
        this.poll = pollToAnswer;
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

export default angular.module('pollPortalMeanApp.answer', [uiRouter])
  .config(routing)
  .component('answer', {
    template: require('./answer.html'),
    controller: AnswerController
  })
  .name;
