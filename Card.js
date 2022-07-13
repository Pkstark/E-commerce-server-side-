const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    prize : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        require : true
    }
})

const Cart = mongoose.model("card" , userSchema);

module.exports = Cart