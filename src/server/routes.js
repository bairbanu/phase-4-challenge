const express = require('express');
const router = express.Router();

const home = require('./routes/home');
const albums = require('./routes/albums');

router.use(home);
router.use(albums);

module.exports = router;
