const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Chapter = require("../models/chapter");

const getChapterById = async (req, res, next) => {
  const chapterId = req.params.chapterId;
  let chapter;

  try {
    chapter = await Chapter.findById(chapterId);
  } catch (err) {
    const error = new HttpError(
      "Could not find chapter with ID " + chapterId,
      500
    );
    return next(error);
  }

  if (!chapter) {
    const error = new HttpError(
      "Could not find a chapter with the given ID",
      404
    );
    return next(error);
  }

  res.json({ chapter: chapter.toObject({ getters: true }) });
};

const getChapters = async (req, res, next) => {
  let chapters;

  try {
    chapters = await Chapter.find();
  } catch (err) {
    const error = new HttpError("Fetching chapters failed", 500);
    return next(error);
  }

  if (!chapters || chapters.length === 0) {
    const error = new HttpError("Found no chapters", 404);
    return next(error);
  }

  res.json({
    chapters: chapters.map((chapter) => chapter.toObject({ getters: true })),
  });
};

const createChapter = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid data in call", 422);
  }

  const { number, title } = req.body;
  const createdChapter = new Chapter({
    number,
    title,
    image: "https://www.girlgeniusonline.com/books/1.jpg",
  });

  try {
    await createdChapter.save();
  } catch (err) {
    const error = new HttpError("Failed to create a new chapter", 500);
    return next(error);
  }

  res.status(201).json({ chapter: createdChapter });
};

const updateChapter = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid data in call", 422);
  }

  const { number, title } = req.body;
  const chapterId = req.params.chapterId;

  let chapter;

  try {
    chapter = await Chapter.findById(chapterId);
  } catch (err) {
    const error = new HttpError(
      "Could not find chapter with ID " + chapterId,
      500
    );
    return next(error);
  }

  if (!chapter) {
    return next(
      new HttpError("Chapter not found with given ID", 404)
    );
  }

  chapter.number = number;
  chapter.title = title;

  try {
    await chapter.save();
  } catch (err) {
    const error = new HttpError("Could not update chapter", 500);
    return next(error);
  }
  res.status(200).json({ chapter: chapter.toObject({ getters: true }) });
};

const deleteChapter = async (req, res, next) => {
  const chapterId = req.params.chapterId;
  let chapter;
  try {
    chapter = await Chapter.findById(chapterId);
  } catch (err) {
    const error = new HttpError(
      "Could not find chapter with ID " + chapterId,
      500
    );
    return next(error);
  }

  if (!chapter) {
    const error = new HttpError(
      "Chapter not found with given ID " + chapterId,
      404
    );
    return next(error);
  }

  try {
    await chapter.remove();
  } catch (err) {
    const error = new HttpError("Could not delete chapter", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted chapter" });
};

exports.getChapterById = getChapterById;
exports.getChapters = getChapters;
exports.createChapter = createChapter;
exports.updateChapter = updateChapter;
exports.deleteChapter = deleteChapter;
