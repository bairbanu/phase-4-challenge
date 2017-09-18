const express = require('express');
const router = express.Router();

const albums = require('../../models/albums');
const reviews = require('../../models/reviews');

router.get('/', (req, res) => {
  Promise.all([ albums.get(), reviews.getThreeNewest() ])
    .then(([albums, reviews]) => {
      res.render('index', { albums, reviews, loggedIn: false });
    })
    .catch((err) => {
      res.status(500).render('error', { error: err });
    });
});

module.exports = router;
