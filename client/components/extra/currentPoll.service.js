'use strict';

export function CurrentPoll() {
  'ngInject';
  // Public API here
  var pollId;
  var setCurrentPoll = function(id) {
    pollId = id;
  }

  var getCurrentPoll = function() {
    return pollId;
  }

  return {
    setCurrentPoll: setCurrentPoll,
    getCurrentPoll: getCurrentPoll
  };
}
