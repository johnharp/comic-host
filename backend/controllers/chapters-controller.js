const HttpError = require('../models/http-error');
const { v4: uuidv4 }  = require('uuid');

const DUMMY_CHAPTERS = [
    {
      id: "c1",
      name: "Chapter 1",
      title: "Agatha Heterodyne and the Beetleburg Clank",
      image: "https://www.girlgeniusonline.com/books/1.jpg",
    },
    {
      id: "c2",
      name: "Chapter 2",
      title: "Agatha Heterodyne and the Airship City",
      image: "https://www.girlgeniusonline.com/books/2.jpg",
    },
    {
      id: "c3",
      name: "Chapter 3",
      title: "Agatha Heterodyne and the Monster Engine",
      image: "https://www.girlgeniusonline.com/books/3.jpg",
    },
  ];

  const getChapterById = (req, res, next) => {
    const chapterId = req.params.chapterId;
    const chapter = DUMMY_CHAPTERS.find((c) => {
      return c.id === chapterId;
    });
  
    if (!chapter) {
        const error = new HttpError('Could not find a chapter with the given ID', 404);
        return next(error);
    }
  
    res.json({ chapter: chapter });
  };

  const createChapter = (req, res, next) => {
    const { name, title } = req.body;
    const createdChapter = {
        id: uuidv4(),
        name,
        title
    };

    DUMMY_CHAPTERS.push(createdChapter);

    res.status(201).json({chapter: createdChapter});
  };

  exports.getChapterById = getChapterById;
  exports.createChapter = createChapter;