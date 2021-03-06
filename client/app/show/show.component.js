import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './show.routes';

export class ShowController {

  /*@ngInject*/
  constructor($http, $q, $stateParams, $window, $state) {
    this.$http = $http;
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$window = $window;
  }

  $onInit() {
    this.$http.get('/api/polls/' + this.$stateParams.pollId)
      .then(response => {
        this.poll = response.data;
        var end = new Date(this.poll.endDate).getTime();
        var start = new Date(this.poll.startDate).getTime();
        //If the poll isn't a closed poll
        if((start < Date.now() && end > Date.now()) || start > Date.now()) {
          this.$state.go(
            'dashboard',
            {
              error: "You can't see results of that poll."
            });
        }
        var i = 0;
        var j = 0;
        //Num of answers to show for each
        var defaultLimit = 5;
        for(var question of this.poll.questions) {
          if(question.type == 'b' || question.type == 'c') {
            for(var answer of question.answers) {
              //Find the index of the poption related to the answer
              var optIndex = _.findIndex(
                this.poll.questions[i].options,
                { '_id':  answer.optionId });
              var numOfChoices = answer.counter;
              var numOfJoins = this.poll.joins;
              var percentage = numOfChoices * 100 / numOfJoins;
              percentage = Number(Math.round(percentage+'e1')+'e-1');
              this.poll.questions[i].options[optIndex].percentage = percentage;
              j++;
            }
          } else {
            this.poll.questions[i].limit = this.defaultLimit;
          }
          i++;
        }
      }, err => {
        this.$state.go("dashboard", { error: "That poll doesn't exist." });
      });
  }

  //Set the number of answers to be showed.(question type a)
  changeLimit(index) {
    this.poll.questions[index].limit = this.poll.joins;
  }
}

export default angular.module('pollPortalMeanApp.show', [uiRouter])
  .config(routing)
  .component('show', {
    template: require('./show.html'),
    controller: ShowController
  })
  .name;
