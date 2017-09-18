const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const { validateSignInForm } = require('../middlewares/validation');
const { signOutUser } = require('../../models/helper-functions');
const user = require('../../models/users');
const reviews = require('../../models/reviews');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.get('/sign-up', (req, res) => {
  res.render('sign-up', { error: false });
});

router.route('/sign-in')
  .get((req, res) => {
    res.render('sign-in', { error: false });
  })
  .post(urlEncodedParser, validateSignInForm, (req, res, next) => {
    console.log('this ROUTE is hitting POST SIGN-IN');
    const credentials = req.body;
    let userToDisplay;

    user.loginByEmail(credentials, req)
      .then((user) => {
        userToDisplay = user;
        return reviews.getByUserId(user.id);
      })
      .then((reviews) => {
        console.log('entering coming in after loginByEmail database call');
        res.render('user', { user: userToDisplay, reviews });
      })
      .catch((error) => {
        console.log('An error occured while logging in user::', error);
        next(new Error('incorrect email and/or password'));
      })
  });

router.get('/sign-out', (req, res) => {
  signOutUser(req);
  res.redirect('/?isloggedIn=false');
})

module.exports = router;
