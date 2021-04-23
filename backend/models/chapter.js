const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    number: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, required: false }
});

module.exports = mongoose.model('Chapter', chapterSchema);