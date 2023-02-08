const mongoose = require('mongoose');

const Book = mongoose.model('Book', {
    name: String,
    id: Number,
    author: Object
})

module.exports = Book 