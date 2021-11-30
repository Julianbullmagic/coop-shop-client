const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password)
  try {
    const user = await User.find(email);
    console.log(user)
    if (user[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];

    const isEqual = await bcrypt.compare(password, storedUser.password);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }



    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.userid,
          cool: storedUser.cool
      },
      process.env.SECRETKEY,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: storedUser.userid, cool: storedUser.cool });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
