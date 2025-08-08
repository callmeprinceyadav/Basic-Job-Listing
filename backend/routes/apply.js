const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
router.post('/:jobId', async (req, res) => {
  const { name, email, resumeUrl } = req.body;
  await Application.create({ jobId: req.params.jobId, name, email, resumeUrl });
  res.json({ message: 'Applied successfully' });
});
module.exports = router;
