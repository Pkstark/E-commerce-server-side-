const mongoose = require('mongoose');

const put = mongoose.Schema;

const huser = new put ({
    mobilename : String,
    mobileprize : String
})

const Mobile = mongoose.model("mobile", huser);

module.exports = Mobile;