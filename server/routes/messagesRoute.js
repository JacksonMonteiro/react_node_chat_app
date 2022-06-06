const { addMsg, getAllMessages } = require('../controllers/messagesController');

const router = require('express').Router();

router.post('/getmsg/', getAllMessages);
router.post('/addmsg/', addMsg);

module.exports = router;