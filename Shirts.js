const mongoose = require('mongoose');

const put = mongoose.Schema;

const huser = new put({
    name: {
        type: String,
        required: true,
        trim: true
    },
    prize: {
        type: String,
        required: true
    },
    offerprize : {
        type : String,
        required : true
    },
    photo: {
        type: String,
        require: true
    },
    stock1 : {
        type : String,
        require : true
    },
    stock2 : {
        type : String,
        require:true
    },
    availability : {
        type : Boolean
    },
    discount : {
        type : String
    }
})

const Shirts = mongoose.model("shirts", huser);

module.exports = Shirts;