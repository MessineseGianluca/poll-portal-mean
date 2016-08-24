'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('pollPortalMeanApp.util', [])
  .factory('Util', UtilService)
  .name;
