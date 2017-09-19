const express = require('express');
const router = express.Router();

const review = require('../../models/reviews');
const { isLoggedIn } = require('../middlewares/validation');

router.post('/', (req, res) => {
  // create a new review
});

router.post('/delete/:reviewID/:userID', isLoggedIn, (req, res, next) => {
  const { reviewID, userID } = req.params;

  review.remove(reviewID, userID, req, next)
    .then(() => {
      console.log('this is the query:::', req.query);
      res.redirect(`/users/${userID}`);
    })
    .catch((error) => {
      res.render('error', { error });
    })
});


module.exports = router;
