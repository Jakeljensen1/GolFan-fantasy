const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { error } = require('node:console');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' }

  //incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registerd';
  }

  //incorrect password, remember we return the error at the bottom of the handleErrors function
  if (err.message === 'incorrect password') {
    errors.password = 'that password is incorrect';
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  //validation errors
  if (err.message && err.message.includes('user validation failed')) {
    //console.log(err); // Inside this error object, we will have a property called errors: if both email/password are bad, that object will contain a property for both email and password
    //include err.message included to make handleErrors() safe when err.message is missing
    (Object.values(err.errors)).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    }); // This Object.values gets us the values of this err.errors object
  }
  return errors; // This will then be fed into the catch function if there is an error and the 
}

// SignUp
module.exports.signup_post = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Create user (includes hash password func)
    const user = await User.create({ email, password, name });

    // Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send JSON back to React, so React can use/disply data
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//login
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password) // static method attached to User model
    const token = createToken(user._id) // MongoDB -> "_id"
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });// 1hr 
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

//get route to verify user logged in
module.exports.user_get = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};



