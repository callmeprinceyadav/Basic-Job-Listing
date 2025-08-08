const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String }
});

JobSchema.index({ title: 1, company: 1, location: 1 }, { unique: true });

module.exports = mongoose.model('Job', JobSchema);


module.exports = mongoose.model('Job', JobSchema);
