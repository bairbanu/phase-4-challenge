const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const albums = require('../../models/albums');
const reviews = require('../../models/reviews');
const { isLoggedIn } = require('../middlewares/validation');

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

router.post('/:albumID/reviews/new', urlEncodedParser, (req, res) => {
  // get content from textarea: req.body.content
  // save content to database -- need user id, album id, content
  // redirect to album page using album id
})

module.exports = router;
