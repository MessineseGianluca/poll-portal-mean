'use strict';

import {
  CurrentPoll
} from './currentPoll.service';

export default angular.module('pollPortalMeanApp.currentPoll', [])
  .factory('CurrentPoll', CurrentPoll)
  .name;
