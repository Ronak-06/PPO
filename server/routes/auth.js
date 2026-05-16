const express = require('express');
const router = express.Router();
const { register, login, getMembers } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/members', verifyToken, isAdmin, getMembers);

module.exports = router;
