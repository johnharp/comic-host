const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');

const Strip = require('../models/strip');
const Chapter = require('../models/chapter');

const DUMMY_STRIPS = [
    { id: 's1', imageUrl: 'https://www.girlgeniusonline.com/ggmain/strips/ggmain20021104.jpg'},
    { id: 's2', imageUrl: 'https://www.girlgeniusonline.com/ggmain/strips/ggmain20021106.jpg'},
    { id: 's3', imageUrl: 'https://www.girlgeniusonline.com/ggmain/strips/ggmain20021108.jpg'}
];

const getStripById = async (req, res, next) => {
    const stripId = req.params.stripId;

    let strip;

    try {
        strip = await Strip.findById(stripId);
    } catch (err) {
        const error = new HttpError(
            'Error while trying to find strip',
            500
        );
        return next(error);
    }

    if (!strip) {
        const error = new HttpError(
            'Could not locate strip with id ' + stripId,
            404
        );
        return next(error);
    }

    res.json({strip: strip.toObject({ getters: true })});
};

const getStripsByChapterId = async (req, res, next) => {
    const chapterId = req.params.chapterId;

    let chapterWithStrips;
    try {
        chapterWithStrips = await Chapter.findById(chapterId)
            .populate('strips');
    } catch (err) {
        const error = new HttpError(
            'Fetching strips failed, try again.',
            500
        );
        return next(error);
    }

    if (!chapterWithStrips || chapterWithStrips.length === 0) {
        return next(
            new HttpError('Could not find strips for the provided chapter id', 404)
        );
    }

    req.json({
        strips: chapterWithStrips.strips.map(strip =>
            strip.toObject({ getters: true })
        )
    });
}

const createStrip = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs', 422)
        );
    }

    const {number, caption, chapter} = req.body;

    const createdStrip = new Strip({
        number,
        caption,
        image: 'https://www.girlgeniusonline.com/ggmain/strips/ggmain20021104.jpg',
        chapter
    });

    let foundChapter;
    try {
        foundChapter = await Chapter.findById(chapter);
    } catch (err) {
        const error = new HttpError('Creating strip failed', 500);
        return next(error);
    }

    if (!foundChapter) {
        const error = new HttpError('Could not find chapter with given id', 404);
        return next(error);
    }

    console.log(foundChapter);
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdStrip.save({session: sess});
        foundChapter.strips.push(createdStrip);
        await foundChapter.save({ session: sess});
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Creating strip failed', 500
        );
        return next(error);
    }

    res.status(201).json({strip: createdStrip });
};

const updateStrip = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs', 422)
        );
    }

    const { number } = req.body;
    const stripId = req.params.stripId;

    let strip;
    try {
        strip = await Strip.findById(stripId);
    } catch (err) {
        const error = new HttpError(
            'Could not update strip', 500
        );
        return next(error);
    }

    strip.number = number;

    try {
        await strip.save();
    } catch (err) {
        const error = new HttpError(
            'Could not update strip', 500
        );
        return next(error);
    }

    res.status(200).json({ strip: strip.toObject({ getters: true }) });
};

const deleteStrip = async (req, res, next) => {
    const stripId = req.params.stripId;
  
    let strip;
    try {
      strip = await Strip.findById(stripId).populate('chapter');
    } catch (err) {
      const error = new HttpError(
        'Could not delete strip.',
        500
      );
      return next(error);
    }
  
    if (!strip) {
      const error = new HttpError('Could not find strip for this id.', 404);
      return next(error);
    }
  
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await strip.remove({ session: sess });
      strip.chapter.strips.pull(strip);
      await strip.chapter.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        'Could not delete strip.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ message: 'Deleted strip.' });
  };

exports.getStripById = getStripById;
exports.getStripsByChapterId = getStripsByChapterId;
exports.createStrip = createStrip;
exports.updateStrip = updateStrip;
exports.deleteStrip = deleteStrip;