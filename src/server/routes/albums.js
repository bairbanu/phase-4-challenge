const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const albums = require('../../models/albums');
const reviews = require('../../models/reviews');
const { isLoggedIn } = require('../middlewares/validation');
const { mayRedirectHome } = require('../middlewares/redirection');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

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

router.get('/:albumID/reviews/new', isLoggedIn, mayRedirectHome, urlEncodedParser, (req, res) => {
  const album = {
    title: req.query.title,
    id: req.params.albumID
  }

  res.render('review', { album, error: false });
})

module.exports = router;
