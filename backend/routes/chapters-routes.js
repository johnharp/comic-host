const express = require('express');

const router = express.Router();

const DUMMY_CHAPTERS = [
    {
        id: "c1",
        name: "Chapter 1",
        title: "Agatha Heterodyne and the Beetleburg Clank",
        image: "https://www.girlgeniusonline.com/books/1.jpg"
    },
    {
        id: "c2",
        name: "Chapter 2",
        title: "Agatha Heterodyne and the Airship City",
        image: "https://www.girlgeniusonline.com/books/2.jpg"
    },
    {
        id: "c3",
        name: "Chapter 3",
        title: "Agatha Heterodyne and the Monster Engine",
        image: "https://www.girlgeniusonline.com/books/3.jpg"
    }
];

router.get('/:chapterId', (req, res, next) => {
    const chapterId = req.params.chapterId;
    const chapter = DUMMY_CHAPTERS.find(c => {
        return c.id === chapterId;
    });

    res.json({chapter: chapter});
});

module.exports = router;
