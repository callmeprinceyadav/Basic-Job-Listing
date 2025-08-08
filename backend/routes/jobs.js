const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { adminAuth } = require('../middleware/auth');

// GET jobs with optional search filter
router.get('/', async (req, res) => {
  try {
    const { keyword, location } = req.query;
    let filter = {};
    if (keyword) filter.title = new RegExp(keyword, 'i');
    if (location) filter.location = new RegExp(location, 'i');
    const jobs = await Job.find(filter);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    if (err.code === 11000) {  // Mongo duplicate key error code
      return res.status(400).json({ error: 'Duplicate job listing. This job already exists.' });
    }
    res.status(500).json({ error: err.message });
  }
});


// PUT update job by id (admin protected)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE job by id (admin protected)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
