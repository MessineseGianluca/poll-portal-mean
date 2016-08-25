'use strict';

var express = require('express');
var controller = require('./poll.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

/* Polls */
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
//router.post('/:id/answer', auth.isAuthenticated(), controller.answerPoll);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);


/* Questions */
//router.get('/polls/:id/questions', auth.hasRole('admin'), controller.showQuestions);
//router.get('/polls/:id/questions/:id', auth.hasRole('admin'), controller.showSingleQuestion);
//router.post('/polls/:id/questions', auth.hasRole('admin'), controller.createQuestion);
//router.put('/polls/:id/questions/:id', auth.hasRole('admin'), controller.updateQuestion);
//router.delete('/polls/:id/questions/:id', auth.hasRole('admin'), controller.destroyQuestion);

/* Options */
//router.get('/polls/:id/questions/:id/options', auth.hasRole('admin'), controller.showOptions);
//router.get('/polls/:id/questions/:id/options/:id', auth.hasRole('admin'), controller.showOption);
//router.post('/polls/:id/questions/:id/options', auth.hasRole('admin'), controller.createOption);
//router.put('/polls/:id/questions/:id/options/:id', auth.hasRole('admin'), controller.updateOption);
//router.delete('/polls/:id/questions/:id/options/:id', auth.hasRole('admin'), controller.destroyOption);

module.exports = router;
