const express = require('express');
const router = express.Router();

router.delete('/', (req, res) => {
  res.send('it hit the delete route');
})

module.exports = router;
