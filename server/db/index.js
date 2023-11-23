require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

module.exports = db;
