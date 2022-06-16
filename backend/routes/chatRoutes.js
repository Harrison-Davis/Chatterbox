const express = require("express");
const { accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup } = require("../controllers/chatControllers")
const { protect } = require("../middleware/authMiddleware");



const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats); //find all chats
router.route('/creategroup').post(protect, createGroupChat); //create group chate
router.route('/renamegroup').put(protect, renameGroupChat); //rename group chat
router.route('/removefromgroup').put(protect, removeFromGroup); //remove user from group
router.route('/addtogroup').put(protect, addToGroup); //add user to group

module.exports = router;