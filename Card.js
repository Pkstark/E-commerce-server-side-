const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
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
        require : true
    },
    photo: {
        type: String,
        require: true
    },
    quantity : {
        type : String,
        require : true
    },
    discount : {
        type : String
    },
    totalprize: {
        type : String
    }
})

const Cart = mongoose.model("card", userSchema);

module.exports = Cart