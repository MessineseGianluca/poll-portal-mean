'use strict';

import LoginController from './login.controller';

export default angular.module('pollPortalMeanApp.login', [])
  .controller('LoginController', LoginController)
  .name;
