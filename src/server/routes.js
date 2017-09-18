const express = require('express');
const router = express.Router();

const home = require('./routes/home');

router.use(home);

module.exports = router;
