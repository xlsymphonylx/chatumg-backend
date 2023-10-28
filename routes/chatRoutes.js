const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');

router.get('/groups', chatController.getAllGroups);
router.post('/groups', chatController.createGroup);
router.get('/groups/:groupId/messages', chatController.getAllGroupMessages);
router.post('/groups/:groupId/messages', chatController.createGroupMessage);

module.exports = router;
