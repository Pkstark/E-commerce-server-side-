const mongoose = require('mongoose');

const Set = mongoose.Schema;

const userDetl = new Set({
    username: String,
    password: String
})

const Person = mongoose.model("Admin", userDetl);

module.exports = Person;