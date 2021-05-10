const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stripSchema = new Schema({
    number: { type: Number, required: true, unique: true },
    image: { type: String, required: false }
});

module.exports = mongoose.model('Strip', stripSchema);