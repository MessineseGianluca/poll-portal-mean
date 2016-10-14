import angular from 'angular';
import routing from './modify.routes';
import uiRouter from 'angular-ui-router';

export class ModifyController {
  /*@ngInject*/
  constructor($http, $stateParams) {
    // Use the User $resource to fetch all users
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.showModifyQuestionPanel = false;
    this.$http.get('/api/polls/' + this.$stateParams.pollId)
      .then(response => {
        this.poll = response.data;
        this.selectedQuestion = this.poll.questions[0];
      });
  }

  modifyQuestion(quesId) {
    this.showModifyQuestionPanel = true;
  }

  hideQuestionPanel() {
    this.showModifyQuestionPanel = false;
  }

  editOption(optionId, newValue) {
    console.log(optionId, newValue);
  }

  deleteQuestion(quesId) {
    this.$http.delete('/api/polls/' + this.poll._id + '/questions/' + quesId);
    _.remove(this.poll.questions, {
      _id: quesId
    });
    this.logMessage = "Question removed";
    this.selectedQuestion = this.poll.questions[0];
  }
}

export default angular.module('pollPortalMeanApp.modify', [uiRouter])
  .config(routing)
  .component('modify', {
    template: require('./modify.html'),
    controller: ModifyController
  })
  .name;
