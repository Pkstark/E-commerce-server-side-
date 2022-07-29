const mongoose = require('mongoose');

const put = mongoose.Schema;

const huser = new put({
    username : {
        type : String,
    },
    name : {
        type : String,
    },
    url : {
        type : String,
    },
    image : {
        type : String,
    },
    select : {
        type : String,
    }
})

const Form = mongoose.model("form", huser);

module.exports = Form;