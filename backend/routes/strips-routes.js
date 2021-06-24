const express = require('express');
const { check } = require("express-validator");
const router = express.Router();

const stripsController = require('../controllers/strips-controller');

router.get('/chapter/:chapterId', stripsController.getStripsByChapterId);
router.get('/:stripId', stripsController.getStripById);
router.post(
    "/",
    [check("number").not().isEmpty()],
    stripsController.createStrip
  );
  router.patch(
    "/:stripId",
    [check("number").not().isEmpty()],
    stripsController.updateStrip
  );
  router.delete("/:chapterId", stripsController.deleteStrip);

module.exports = router;
