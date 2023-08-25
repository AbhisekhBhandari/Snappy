const router = require('express').Router();
const messagesController = require('../controllers/messageController')

router.post('/addmsg', messagesController.addMessage)
router.post('/getMsg', messagesController.getAllMessage)


module.exports = router