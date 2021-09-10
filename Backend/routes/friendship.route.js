const express = require('express');
const router = express.Router();

const friendshipController = require('../controllers/friendship.controller');

router.route('/suggestion').get(friendshipController.get);
router.route('/').post(friendshipController.create);

module.exports = router;
