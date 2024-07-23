
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {  validationResult } = require('express-validator');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



const Register = async (req, res) => {

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;
  try {
    const user = new User({lastName, firstName, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  })(req, res, next);
};


const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
   
    // Check if the user already exists in the database
    let user = await User.findOne({ email: credential.email });

    if (!user) {
      // If the user does not exist, create a new user
      user = new User({
        lastName: payload.family_name,
        firstName: payload.given_name,
        email: payload.email,
        password: "Test@123", // Consider a more secure approach to handling passwords
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(401).json({ message: 'Invalid Google credential' });
  }
};

module.exports = {
  Register,
  Login,
  googleLogin
}
