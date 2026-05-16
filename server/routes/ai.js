const express = require('express');
const router = express.Router();
const { generateDescription, suggestPriority, smartSummary } = require('../controllers/aiController');
const { verifyToken } = require('../middleware/auth');

router.post('/generate-description', verifyToken, generateDescription);
router.post('/suggest-priority', verifyToken, suggestPriority);
router.post('/smart-summary', verifyToken, smartSummary);

module.exports = router;
