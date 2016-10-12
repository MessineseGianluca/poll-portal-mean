'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

// import ngMessages from 'angular-messages';
//import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin/admin.component';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import welcome from './welcome/welcome.component';
import dashboard from './dashboard/dashboard.component';
import answer from './answer/answer.component';
import show from './show/show.component';
import modify from './modify/modify.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import currentPoll from '../components/extra/currentPoll.module';

import './app.css';

angular.module('pollPortalMeanApp', [
    // ngAnimate,
    ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap,
    // ngMessages,

    // ngValidationMatch,
    _Auth, account, admin, navbar, footer, welcome, constants, util, dashboard,
    answer, show, currentPoll, modify
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['pollPortalMeanApp'], {
      strictDi: true
    });
  });
