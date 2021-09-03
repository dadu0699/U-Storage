const express = require('express');
const router = express.Router();

const friendshipController = require('../controllers/friendship.controller');

router.route('/')
  .post(friendshipController.create)
  .get(friendshipController.get);

module.exports = router;
