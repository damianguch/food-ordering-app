require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection to database successfull!');
  })
  .catch((err) => {
    console.log({ error: err.message });
  });

const db = mongoose.connection;

module.exports = db;
