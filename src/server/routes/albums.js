const express = require('express');
const router = express.Router();

const albums = require('../../models/albums');
const reviews = require('../../models/reviews');

// this is a partially authorized route -- have to add authorization check middleware
// do this after setting up authentication
router.get('/:albumID', (req, res) => {
  const { albumID } = req.params;

  Promise.all([albums.getById(albumID), reviews.getByAlbumId(albumID)])
    .then(([album, reviews]) => {
      // check logged in status before rendering proper page
      // if logged in, render logged in 'true' header
      // if logged in, show add review button and delete review icon
      res.render('album', { album: album[0], reviews, loggedIn: false });
    })
    .catch((error) => {
      res.status(500).render('error', { error: error })
    })
});

module.exports = router;
