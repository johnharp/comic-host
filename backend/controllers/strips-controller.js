const HttpError = require('../models/http-error');

const DUMMY_STRIPS = [
    { id: 's1', imageUrl: 'https://www.girlgeniusonline.com/ggmain/strips/ggmain20021104.jpg'},
    { id: 's2', imageUrl: 'https://www.girlgeniusonline.com/ggmain/strips/ggmain20021106.jpg'},
    { id: 's3', imageUrl: 'https://www.girlgeniusonline.com/ggmain/strips/ggmain20021108.jpg'}
];

const getStripById = (req, res, next) => {
    const stripId = req.params.stripId;
    const strip = DUMMY_STRIPS.find(s => {
        return s.id === stripId
    });

    if (!strip) {
        const error = new HttpError('Could not find a strip with the given ID', 404);
        return next(error);
      }

    res.json({strip: strip});
};

exports.getStripById = getStripById;