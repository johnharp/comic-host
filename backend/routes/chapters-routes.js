const express = require("express");
const { check } = require("express-validator");

const chaptersControllers = require("../controllers/chapters-controller");
const router = express.Router();

router.get("/:chapterId", chaptersControllers.getChapterById);
router.get("/", chaptersControllers.getChapters);
router.post(
  "/",
  [check("number").not().isEmpty(), check("title").isLength({ min: 5 })],
  chaptersControllers.createChapter
);
router.patch(
  "/:chapterId",
  [check("number").not().isEmpty(), check("title").isLength({ min: 5 })],
  chaptersControllers.updateChapter
);
router.delete("/:chapterId", chaptersControllers.deleteChapter);

module.exports = router;
