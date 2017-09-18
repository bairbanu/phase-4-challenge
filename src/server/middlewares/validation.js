const { isEmpty } = require('../../models/helper-functions');

function validateSignUpForm(req, res, next) {
  const { name, email, password } = req.body;

  if ( isEmpty(name, email, password) ) next(new Error('empty sign-up field'));
  else next();
}

function validateSignInForm(req, res, next) {
  const { email, password } = req.body;

  if ( isEmpty(email, password) ) next(new Error('empty sign-in field'));
  else next();
}

function isLoggedIn(req, res, next) {
  // check params for signout route logging out
  // check session for a user object 
}

module.exports = {
  validateSignUpForm,
  validateSignInForm
}