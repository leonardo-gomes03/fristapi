const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    name: String,
    id: Number,
})

module.exports = Person 