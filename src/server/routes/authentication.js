const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const { validateSignInForm } = require('../middlewares/validation');
const user = require('../../models/users');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.get('/sign-up', (req, res) => {
  res.render('sign-up', { error: false });
});

router.get('/sign-in', (req, res) => {
  res.render('sign-in', { error: false });
});

router.post('/authenticate', urlEncodedParser, validateSignInForm, (req, res, next) => {
  const credentials = req.body;

  user.loginByEmail(credentials, req)
    .then(() => {
      res.render('user');
    })
    .catch((error) => {
      console.log('An error occured while logging in user::', error);
      next(new Error('incorrect email and/or password'));
    })
});

module.exports = router;
