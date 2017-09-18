const express = require('express');
const router = express.Router();

const home = require('./routes/home');
const albums = require('./routes/albums');
const users = require('./routes/users');
const authentication = require('./routes/authentication');

router.use(home);
router.use(albums);
router.use(authentication);

module.exports = router;
