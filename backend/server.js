const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Import routes
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/apply', require('./routes/apply'));
app.use('/api/admin', require('./routes/admin'));

app.listen(5000, () => console.log('Server started on port 5000'));
