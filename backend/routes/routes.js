const express = require('express');
const { signup } = require('../controllers/signup');
const { login } = require('../controllers/login');

const { auth } = require('../middleware/auth');
const { bot } = require('../controllers/bot');

const router = express.Router();

router.post('/create', signup);
router.post('/login', login);

router.get('/authenticateUser', auth, (req, resp) => {
    resp.status(200).json({
        success : true,
        msg : "Welcome to Website"
    })
})

router.post('/messages', auth, bot)

module.exports = router;