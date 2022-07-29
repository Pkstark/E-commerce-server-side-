const mongoose = require('mongoose');

const put = mongoose.Schema;

const huser = new put({
    username : {
        type : String,
    },
    image : {
        type : String,
    }
})

const Pro = mongoose.model("photo1", huser);

module.exports = Pro;