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
        var i = 0;
        var j = 0;
        //Num of answers to show for each question(type 'a')
        this.defaultLimit = 5;
        
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
        //Set the number of answers to be showed.(question type a)
        console.log(this.poll);
      });
  }

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
