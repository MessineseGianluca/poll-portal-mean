import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './dashboard.routes';

export class DashboardController {

  /*@ngInject*/
  constructor($http, $q, $window, $stateParams) {
    this.$http = $http;
    this.$q = $q;
    this.$window = $window;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.$q.all([
      this.$http.get('/api/polls'),
      this.$http.get('/api/users/me')
    ]).then(response => {
      this.alertMessage = this.$stateParams.error;
      // get all polls
      var polls = response[0].data;
      //get the id of the polls answered by the logged user
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
      this.myAnsweredPollsId = joins;
      this.openedPolls = openedPolls;
      this.closedPolls = closedPolls;
      this.incomingPolls = incomingPolls;
      this.answeredPolls = answeredPolls;
    });
  }

  clickOpened(id) {
    if(this.myAnsweredPollsId == '')
      this.$window.location.href = '/answer/' + id;
    else {
      var redirect = true;
      for(var pollId of this.myAnsweredPollsId) {
        if(pollId == id) {
          this.alertMessage = "You have already answered this poll.";
          redirect = false;
        }
      }
      if(redirect)
        this.$window.location.href = '/answer/' + id;
    }
  }
  clickClosed(id, joins) {
    //CurrentPoll.setCurrentPoll(id);
    if(joins == 0) {
      this.alertMessage = "This poll has never been answered.";
    }
    else
      this.$window.location.href = "/show/" + id;
  }
}

export default angular.module('pollPortalMeanApp.dashboard', [uiRouter])
  .config(routing)
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: DashboardController
  })
  .name;
