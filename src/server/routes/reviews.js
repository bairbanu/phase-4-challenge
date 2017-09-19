const express = require('express');
const router = express.Router();

const review = require('../../models/reviews');
const { isLoggedIn } = require('../middlewares/validation');
const { redirectAfterReviewDelete } = require('../middlewares/redirection');

router.post('/', (req, res) => {
  // create a new review
});

router.post('/delete/:reviewID/:userID', isLoggedIn, redirectAfterReviewDelete, (req, res, next) => {
  const { reviewID, userID } = req.params;
  const redirectAfterReviewDelete = req.direct;

  review.remove(reviewID, userID, req, next)
    .then(() => {
      res.redirect(redirectAfterReviewDelete);
    })
    .catch((error) => {
      res.render('error', { error });
    })
});


module.exports = router;
