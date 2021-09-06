const express = require('express');
const router = express.Router();

router.route('/').get((_req, res) => {
  res.status(200).send({
    status: 'ok'
  });
});

module.exports = router;
