const mongoose = require('mongoose');

const put = mongoose.Schema;

const huser = new put({
    username : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    select : {
        type : String,
        required : true
    }
})

const Form = mongoose.model("form", huser);

module.exports = Form;