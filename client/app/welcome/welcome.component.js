import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './welcome.routes';

export class WelcomeController {}

export default angular.module('pollPortalMeanApp.main', [uiRouter])
  .config(routing)
  .component('welcome', {
    template: require('./welcome.html'),
    controller: WelcomeController
  })
  .name;
