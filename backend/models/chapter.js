const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    number: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: false },
    strips: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Strip'}]
});

module.exports = mongoose.model('Chapter', chapterSchema);