const express = require('express');

const router = express.Router();

const stripsControllers = require('../controllers/strips-controller');


router.get('/:stripId', stripsControllers.getStripById);

module.exports = router;
