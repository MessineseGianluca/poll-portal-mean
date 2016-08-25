'use strict';

import mongoose from 'mongoose';

var OptionSchema = new mongoose.Schema({
  text: {type: String, max: 255},
});

var AnswerSchema = new mongoose.Schema({
  content: {type: String, max: 255},
  option_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Option'}
});

var QuestionSchema = new mongoose.Schema({
  text: {type: String, max: 255},
  type: {type: String, max: 1},
  options: [OptionSchema],
  answers: [AnswerSchema]
});

var PollSchema = new mongoose.Schema({
  title: { type: String, max: 255 },
  start_date: Date,
  end_date: Date,
  questions: [QuestionSchema]
});

export default mongoose.model('Answer', AnswerSchema);
export default mongoose.model('Option', OptionSchema);
export default mongoose.model('Question', QuestionSchema);
export default mongoose.model('Poll', PollSchema);
