const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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

const Product = mongoose.model("Images", userSchema);

module.exports = Product;