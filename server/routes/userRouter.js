const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/register', (req, res) => {
  const { name, email, firebase_id } = req.body;

  const user = new User({
    name,
    email,
    firebase_id
  });

  user.save((err, user) => {
    if (err) {
      res.status(400).send({ error: err });
    } else {
      const { _id, email, isAdmin, name } = user;
      res.status(200).send({
        data: {
          _id,
          email,
          isAdmin,
          name
        }
      });
    }
  });
});

router.post('/login', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const { _id, name, email, isAdmin } = user;

      res.json({
        data: {
          _id,
          name,
          email,
          isAdmin
        }
      });
    } else {
      throw new Error('User not found');
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
