const express = require('express');

const router = express.Router();

const stripsController = require('../controllers/strips-controller');

router.get('/chapter/:chapterId', stripsController.getStripsByChapterId);
router.get('/:stripId', stripsController.getStripById);
router.post("/", stripsController.createStrip);

module.exports = router;
