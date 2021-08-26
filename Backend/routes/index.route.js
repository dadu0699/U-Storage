const express = require('express');
const router = express.Router();

router.route('/').get((_req, res) => {
  res.send({
    curso: 'ok'
  });
});

module.exports = router;
