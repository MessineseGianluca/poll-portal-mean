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
          /*if(pollId == pollToAnswer._id)
            this.$window.location.href = '/dashboard';*/
        }
        this.poll = pollToAnswer;
        this.answers = new Array();
        var i = 0;
        for(var question of this.poll.questions) {
          var obj = {
                      quesId: question._id,
                      type: question.type,
                      content: []
                    };
          if(question.type == 'c') {
            for(var index in question.options) {
              obj.content.push({
                value: false,
                optionId: question.options[index]._id
              });
            }
          }
          this.answers.push(obj);
        }
      });
  }

  submitAnswers() {
    var i = 0;
    for(var question of this.answers) {
      if(question.type == 'a') {
        var content = {content: question.content};
        this.poll.questions[i].answers.push(content);
      } else if(question.type == 'b') {
        var index = _.findIndex(this.poll.questions[i].answers, function(o) {
          return o.optionId == question.content;
        });
        // If answer has never been choosen before
        if(index == -1) {
          var obj = {
            optionId: question.content,
            counter: 1,
          };
          this.poll.questions[i].answers.push(obj);
        } else {
          //Increment existing counter
          this.poll.questions[i].answers[index].counter += 1;
        }
      } else {
        for(var index in question.content) {
          if(question.content[index].value) {
            var answerIndex = _.findIndex(
              this.poll.questions[i].answers, function(o) {
                return o.optionId == question.content[index].optionId;
            });
            // If answer has never been choosen before
            if(answerIndex == -1) {
              var obj = {
                optionId: question.content[index].optionId,
                counter: 1,
              };
              this.poll.questions[i].answers.push(obj);
            } else {
              /*Increment existing counter*/
              this.poll.questions[i].answers[answerIndex].counter += 1;
            }
          }
        }
      }
      i++;
    }
    //Increment the number of joins
    this.poll.joins += 1;
    delete this.poll.__v;
    this.$http.put('/api/polls/' + this.poll._id, this.poll);

    /* Here http put request for
     * adding poll_id inside the
     * answered polls array of the user */
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
