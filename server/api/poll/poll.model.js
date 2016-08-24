'use strict';

import mongoose from 'mongoose';

var PollSchema = new mongoose.Schema({
  title: { type: String, max: 255 },
  start_date: Date,
  end_date: Date
});

export default mongoose.model('Poll', PollSchema);
