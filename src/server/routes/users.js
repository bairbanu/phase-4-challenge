const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const users = require('../../models/users');
const reviews = require('../../models/reviews');

const { validateSignUpForm, isLoggedIn } = require('../middlewares/validation');
const { mayRedirectHome } = require('../middlewares/redirection');
const { loginUser, createUserObjectFromSession } = require('../../models/helper-functions');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.route('/')
  .get(isLoggedIn, mayRedirectHome, (req, res) => {
    const user = createUserObjectFromSession(req.session.user);
    reviews.getByUserId(user.id)
      .then((reviews) => {
        res.render('user', { user, reviews, loggedIn: req.isLoggedIn });
      })
  })
  .post(urlEncodedParser, validateSignUpForm, isLoggedIn, (req, res) => {
    const newUser = req.body;
    let userToDisplay;

    users.create(newUser)
      .then((user) => {
        loginUser(user, req);
        res.redirect(`users/${user.id}`);
      })
      .catch((error) => {
        console.log('An error occured while creating new user:', error);
        next(new Error('user exists'));
      })
  })

router.get('/:userID', isLoggedIn, (req, res) => {
  const { userID } = req.params;

  Promise.all( [users.getById(userID), reviews.getByUserId(userID) ] )
    .then(([user, reviews]) => {
      res.render('user', { user, reviews, loggedIn: req.isLoggedIn });
    })
    .catch((error) => {
      res.status(500).render('error', { error });
    });
})

module.exports = router;
