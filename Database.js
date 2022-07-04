const mongoose = require('mongoose');

const Unit = mongoose.Schema;

const userDetails = new Unit ({
    username : String,
    email : String,
    password : String
})

const PersonDetails = mongoose.model("Clients", userDetails);

module.exports = PersonDetails;