const express = require("express");


const chaptersControllers = require('../controllers/chapters-controller');
const router = express.Router();



router.get("/:chapterId", chaptersControllers.getChapterById);
router.post("/", chaptersControllers.createChapter);
router.patch("/:chapterId", chaptersControllers.updateChapter);
router.delete("/:chapterId", chaptersControllers.deleteChapter);

module.exports = router;
