const { register, login, setAvatar, getAllUsers } = require('../controllers/userController');
const router  = require('express').Router();

router.get('/allusers:id', getAllUsers)

router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);

module.exports = router;