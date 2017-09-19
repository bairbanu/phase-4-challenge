const express = require('express');
const router = express.Router();

const home = require('./routes/home');
const albums = require('./routes/albums');
const users = require('./routes/users');
const authentication = require('./routes/authentication');
const reviews = require('./routes/reviews');

router.use(home);
router.use('/albums', albums);
router.use(authentication);
router.use('/users', users);
router.use('/reviews', reviews);

module.exports = router;
