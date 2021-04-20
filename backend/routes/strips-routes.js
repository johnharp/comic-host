const express = require('express');

const router = express.Router();

const DUMMY_STRIPS = [
    { id: 's1', imageUrl: 'https://www.girlgeniusonline.com/ggmain/strips/ggmain20021104.jpg'},
    { id: 's2', imageUrl: 'https://www.girlgeniusonline.com/ggmain/strips/ggmain20021106.jpg'},
    { id: 's3', imageUrl: 'https://www.girlgeniusonline.com/ggmain/strips/ggmain20021108.jpg'}
];

router.get('/:stripId', (req, res, next) => {
    const stripId = req.params.stripId;
    const strip = DUMMY_STRIPS.find(s => {
        return s.id === stripId
    });

    if (!strip) {
        return res
          .status(404)
          .json({ message: "Could not find a strip with the given ID." });
      }

    res.json({strip: strip});
});

module.exports = router;
