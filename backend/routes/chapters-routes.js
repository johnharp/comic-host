const express = require("express");


const chaptersControllers = require('../controllers/chapters-controller');
const router = express.Router();



router.get("/:chapterId", chaptersControllers.getChapterById);

module.exports = router;
