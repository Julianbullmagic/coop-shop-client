const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res, next) => {
  console.log("new user",req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) return;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const cool=req.body.cool;
  const phone=req.body.phone;
  const bio=req.body.bio;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      name: name,
      email: email,
      cool:cool,
      phone:phone,
      bio:bio,
      password: hashedPassword,
    };
    console.log(userDetails)

    const result = await User.save(userDetails);

    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
