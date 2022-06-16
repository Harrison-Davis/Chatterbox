const express = require('express');

const router = express.Router()

const {registerUser, authUser, allUsers} = require('../controllers/userControllers')
const { protect } = require('../middleware/authMiddleware')

//You can chain queries onto a single route if multiple are needed.

router.route('/').post(registerUser).get(protect, allUsers)
router.post('/login', authUser)


module.exports = router;

//app.use('/api/user) is the root path. Using router.route in this page adds to the end of that path.
