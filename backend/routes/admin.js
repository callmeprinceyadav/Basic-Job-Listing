const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin');

// Register new admin (optional, can be removed in prod)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: 'All fields required' });
    const exists = await Admin.findOne({ username });
    if (exists) return res.status(400).json({ msg: 'Admin already exists' });
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ msg: 'Admin registered' });
  } catch (err) {
    res.status(500).json({ msg: 'Error registering admin', error: err.message });
  }
});



// Inside your POST /login route handler
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find admin user and verify password here...
  const admin = await Admin.findOne({ username });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  // Generate JWT token that expires in 5 minutes
  const token = jwt.sign(
    { id: admin._id, admin: true },
    process.env.JWT_SECRET,
    { expiresIn: '5m' }  // <-- set token expiry here
  );

  // Send token in response
  res.json({ token });
});

module.exports = router;
