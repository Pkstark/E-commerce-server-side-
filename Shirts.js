const mongoose = require('mongoose');

const put = mongoose.Schema;

const huser = new put ({
    shirtname : String,
    shirtprize : String
})

const Shirts = mongoose.model("shirts", huser);

module.exports = Shirts;