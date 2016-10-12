import angular from 'angular';
import routing from './admin.routes';
import uiRouter from 'angular-ui-router';

export class AdminController {
  /*@ngInject*/
  constructor(User, $http, $state, $window) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.$http = $http;
    this.$window = $window;
    this.$state = $state;
  }

  $onInit() {
    this.$http.get('/api/polls')
      .then(response => {
        this.polls = response.data;
        this.selectedPoll = this.polls[0];
      });
  }

  deletePoll(pollId) {
    this.$http.delete('/api/polls/' + pollId);
    _.remove(this.polls, {
      _id: pollId
    });
    this.selectedPoll = this.polls[0];
  }

  modifyPoll(pollId) {
    this.$window.location.href = '/admin/modify/' + pollId;
  }

  createPoll() {
    this.$state.go('create');
  }

  deleteUser(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

export default angular.module('pollPortalMeanApp.admin', ['pollPortalMeanApp.auth', uiRouter])
  .config(routing)
  .component('admin', {
    template: require('./admin.html'),
    controller: AdminController
  })
  .name;
