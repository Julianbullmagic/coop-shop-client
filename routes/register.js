const express = require('express');
const registerController = require('../controllers/register');
const User = require('../models/user');
const router = express.Router();
const { body } = require('express-validator');

router.post('/',
[
  body('name').trim().not().isEmpty(),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom(async (email) => {
      const user = await User.find(email);
      console.log("email",email)
      if (user[0].length > 0) {
        return Promise.reject('Email address already exist!');
      }
    })
    .normalizeEmail(),
  body('password').trim().isLength({ min: 7 }),
],
 registerController.register);

module.exports = router;
