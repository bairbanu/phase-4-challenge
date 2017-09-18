const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const users = require('../../models/users');
const reviews = require('../../models/reviews');

const { validateSignUpForm, isLoggedIn, mayRedirectHome } = require('../middlewares/validation');
const { loginUser, createUserObjectFromSession } = require('../../models/helper-functions');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.route('/')
  .get(isLoggedIn, mayRedirectHome, (req, res) => {
    const user = createUserObjectFromSession(req.session);
    reviews.getByUserId(user.id)
      .then((reviews) => {
        res.render('user', { user, reviews });
      })
  })
  .post(urlEncodedParser, validateSignUpForm, (req, res) => {
    const newUser = req.body;

    users.create(newUser)
      .then((user) => {
        loginUser(user, req);
        res.render('user');
      })
      .catch((error) => {
        console.log('An error occured while creating new user:', error);
        next(new Error('user exists'));
      })
  })

router.get('/:userID', (req, res) => {

})

module.exports = router;
