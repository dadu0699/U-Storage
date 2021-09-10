const express = require('express');
const router = express.Router();

const friendshipController = require('../controllers/friendship.controller');

router.route('/').post(friendshipController.create);
router.route('/suggestion').get(friendshipController.suggestions);
router.route('/file').get(friendshipController.files);

module.exports = router;
