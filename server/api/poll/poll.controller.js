'use strict';

import jsonpatch from 'fast-json-patch';
import Poll from './poll.model';
var mongoose = require('mongoose');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Things
export function index(req, res) {
  return Poll.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function show(req, res) {
  return Poll.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function create(req, res) {
  return Poll.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Thing in the DB
export function update(req, res) {
  //delete id from the request(because id is autocatically provided)
  if(req.body._id) {
    delete req.body._id;
  }
  return Poll.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Delete a Poll from the DB
export function destroy(req, res) {
  return Poll.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function showQuestions(req, res) {
  return Poll.findById(req.params.id).select('-_id questions').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function showSingleQuestion(req, res) {
  return Poll.aggregate(
    {$match: {_id: mongoose.Types.ObjectId(req.params.pollId)}},
    {$unwind: '$questions'},
    {$match: {'questions._id': mongoose.Types.ObjectId(req.params.quesId)}},
    {$project : {_id: 0, question: "$questions"}}
  ).then(handleEntityNotFound(res))
   .then(respondWithResult(res))
   .catch(handleError(res));
}

export function createQuestion(req, res) {
  return Poll.update(
    { _id: req.params.id },
    { $push: { questions: req.body } } )
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
}

export function updateQuestion(req, res) {
  if(req.body.text && req.body.type) {
    var updates =  {
      "questions.$.text": req.body.text,
      "questions.$.type": req.body.type
    }
  } else if(!req.body.type) {
    var updates =  {
      "questions.$.text": req.body.text
    }
  } else {
    var updates =  {
      "questions.$.type": req.body.type
    }
  }

  return Poll.update(
    { _id: req.params.pollId, "questions._id": req.params.quesId },
    { $set: updates } )
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
}

export function destroyQuestion(req, res) {
  return Poll.update(
    { _id: req.params.pollId },
    { $pull: { questions: { _id: req.params.quesId } } } )
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
}

export function showOptions(req, res) {
  return Poll.aggregate(
    {$match: {_id: mongoose.Types.ObjectId(req.params.pollId)}},
    {$unwind: '$questions'},
    {$match: {'questions._id': mongoose.Types.ObjectId(req.params.quesId)}},
    {$unwind: '$questions.options'},
    {$project : {_id: 0, option: "$questions.options"}}
  ).then(respondWithResult(res))
   .catch(handleError(res));
}

export function showSingleOption(req, res) {
  return Poll.aggregate(
    {$match: {_id: mongoose.Types.ObjectId(req.params.pollId)}},
    {$unwind: '$questions'},
    {$match: {'questions._id': mongoose.Types.ObjectId(req.params.quesId)}},
    {$unwind: '$questions.options'},
    {$match: {'questions.options._id': mongoose.Types.ObjectId(req.params.optId)}},
    {$project : {_id: 0, option: "$questions.options"}}
  ).then(respondWithResult(res))
   .catch(handleError(res));
}

export function createOption(req, res) {
  return Poll.update(
    { _id: req.params.pollId, "questions._id": req.params.quesId },
    { $push: { "questions.$.options": req.body } } )
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
}

export function updateOption(req, res) {
  Poll.findById(req.params.pollId, function(err, poll) {
    var question;
    var option;
    for(question in poll.questions) {
      if(poll.questions[question]._id == req.params.quesId) {
        for(option in poll.questions[question].options) {
          if(poll.questions[question].options[option]._id == req.params.optId) {
            poll.questions[question].options[option].text = req.body.text;
          }
        }
      }
    }
    poll.save();
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function destroyOption(req, res) {
  return Poll.update(
    { _id: req.params.pollId, "questions._id": req.params.quesId },
    { $pull: {"questions.$.options": {_id: req.params.optId} } } )
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
}
