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
    photo: {
        type: String,
        require: true
    }
})

const Product = mongoose.model("Images", userSchema);

module.exports = Product;