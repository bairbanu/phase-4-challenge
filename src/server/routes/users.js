const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const users = require('../../models/users');
const { validateSignUpForm } = require('../middlewares/validation');
const { loginUser } = require('../../models/helper-functions');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

// the get route is authorized so will need to work on it in the future
// it gets the user from the session and populates what needs to be populated
router.route('/')
  .get((req, res) => {
    // get the active user
    res.send('/users get');
  })
  .post(urlEncodedParser, validateSignUpForm, (req, res, next) => {
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

module.exports = router;
