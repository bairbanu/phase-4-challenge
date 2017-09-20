const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const review = require('../../models/reviews');
const { isLoggedIn } = require('../middlewares/validation');
const { redirectAfterReviewDelete } = require('../middlewares/redirection');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', urlEncodedParser, (req, res) => {
  const { album_id } = req.body;

  review.create(req)
    .then(() => {
      res.redirect(`albums/${album_id}`);
    })
    .catch((error) => {
      res.render('error', { error });
    })
});

router.post('/delete/:reviewID/:userID', isLoggedIn, redirectAfterReviewDelete, (req, res, next) => {
  const { reviewID, userID } = req.params;
  const afterReviewDelete = req.direct;

  review.remove(reviewID, userID, req, next)
    .then(() => {
      res.redirect(afterReviewDelete);
    })
    .catch((error) => {
      res.render('error', { error });
    })
});


module.exports = router;
