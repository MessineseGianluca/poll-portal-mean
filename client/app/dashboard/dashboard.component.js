
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './dashboard.routes';

export class DashboardController {

  /*@ngInject*/
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  $onInit() {
    this.$q.all([
      this.$http.get('/api/polls'),
      this.$http.get('/api/users/me'),
    ]).then(response => {
      // get all polls
      var polls = response[0].data;
      //get the polls answered by the logged user
      var joins = response[1].data.polls;
      var closedPolls = new Array();
      var openedPolls = new Array();
      var answeredPolls = new Array();
      var incomingPolls = new Array();
      // looping through polls
      for(var poll of polls) {
        var end = new Date(poll.endDate).getTime();
        var start = new Date(poll.startDate).getTime();
        if(end < Date.now()) {
          closedPolls.push(poll);
        } else if(start < Date.now()) {
          openedPolls.push(poll);
        } else {
          incomingPolls.push(poll);
        }
        // Check if the user has answered the current poll
        for(var join of joins) {
          if(join == poll._id) {
            answeredPolls.push(poll);
          }
        }
        /* Edit Date in such a readable format */
        poll.endDate = new Date(poll.endDate).toUTCString();
        poll.startDate = new Date(poll.endDate).toUTCString();
      }
      this.openedPolls = openedPolls;
      this.closedPolls = closedPolls;
      this.incomingPolls = incomingPolls;
      this.answeredPolls = answeredPolls;
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
