const mongoose = require('mongoose');

const put = mongoose.Schema;

const huser = new put ({
    shoename : String,
    shoeprize : String
})

const Shoes = mongoose.model("shoes", huser);

module.exports = Shoes;