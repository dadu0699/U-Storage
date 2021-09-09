const express = require('express');
const router = express.Router();

const fileController = require('../controllers/file.controller');

router.route('/')
  .get(fileController.get)
  .post(fileController.create)
  .put(fileController.update)
  .delete(fileController.remove);

module.exports = router;
