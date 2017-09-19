const express = require('express');
const router = express.Router();

const albums = require('../../models/albums');
const reviews = require('../../models/reviews');
const { isLoggedIn } = require('../middlewares/validation');

router.get('/:albumID', isLoggedIn, (req, res) => {
  const { albumID } = req.params;

  Promise.all([albums.getById(albumID), reviews.getByAlbumId(albumID)])
    .then(([album, reviews]) => {
      res.render('album', { album: album[0], reviews, loggedIn: req.isLoggedIn });
    })
    .catch((error) => {
      res.status(500).render('error', { error: error })
    })
});

module.exports = router;
