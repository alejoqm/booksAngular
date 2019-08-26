const mongoose = require('mongoose');

const BookInfoSchema = mongoose.Schema({
    title: String,
    info: Object
}, {
    timestamps: true
});

module.exports = mongoose.model('BookInfo', BookInfoSchema);