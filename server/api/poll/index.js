'use strict';

var express = require('express');
var controller = require('./poll.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

/* Polls */
router.get('/', /*auth.isAuthenticated(),*/ controller.index);
router.get('/:id', /*auth.isAuthenticated(),*/ controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
//router.post('/:id/answer', auth.isAuthenticated(), controller.answerPoll);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', /*auth.hasRole('admin'),*/ controller.destroy);

/* Questions */
router.get('/:id/questions', /*auth.hasRole('admin'),*/ controller.showQuestions);
router.get('/:pollId/questions/:quesId', /*auth.hasRole('admin'),*/ controller.showSingleQuestion);
router.post('/:id/questions', /*auth.hasRole('admin'),*/ controller.createQuestion);
router.put('/:pollId/questions/:quesId', /*auth.hasRole('admin'),*/ controller.updateQuestion);
router.delete('/:pollId/questions/:quesId', /*auth.hasRole('admin'),*/ controller.destroyQuestion);

/* Options */
router.get('/:pollId/questions/:quesId/options', /*auth.hasRole('admin'),*/ controller.showOptions);
router.get('/:pollId/questions/:quesId/options/:optId', /*auth.hasRole('admin'),*/ controller.showSingleOption);
router.post('/:pollId/questions/:quesId/options', /*auth.hasRole('admin'),*/ controller.createOption);
router.put('/:pollId/questions/:quesId/options/:optId', /*auth.hasRole('admin'),*/ controller.updateOption);
router.delete('/:pollId/questions/:quesId/options/:optId', /*auth.hasRole('admin'),*/ controller.destroyOption);

module.exports = router;
