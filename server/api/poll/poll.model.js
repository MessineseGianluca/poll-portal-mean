'use strict';

import mongoose from 'mongoose';

var OptionSchema = new mongoose.Schema({
  text: {type: String, max: 255},
  counter: { type: Number, default: 0 } //autoincrement field
  /*For incrementing counter field:
   *counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} });
   */
});

var AnswerSchema = new mongoose.Schema({
  content: {type: String, max: 255}
});

var QuestionSchema = new mongoose.Schema({
  text: {type: String, max: 255},
  type: {type: String, max: 1}, //a=opened , b=single answer, c=multiple answer
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
