'use strict';

import routes from './dashboard.routes';
import DashboardController from './dashboard.controller';

export default angular.module('pollPortalMeanApp.dashboard', ['pollPortalMeanApp.auth', 'ui.router'])
  .config(routes)
  .controller('DashboardController', DashboardController)
  .name;
