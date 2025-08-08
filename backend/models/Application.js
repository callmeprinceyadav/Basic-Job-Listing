const mongoose = require('mongoose');
const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  name: String,
  email: String,
  resumeUrl: String
});
module.exports = mongoose.model('Application', ApplicationSchema);
