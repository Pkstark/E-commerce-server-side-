const express = require('express');
const { default: mongoose } = require('mongoose');

const CDatas = mongoose.Schema;

const clientDetail = new CDatas({
    username: String,
    name: String,
    prize: String,
    photo: String,
    offerprize : String,
    paid: String,
    Approved: String,
    quantity : {
        type : Number,
        require : true
    },
    totalprize : {
        type : Number
    },
    shipping : {
        type : String
    },
    discount : {
        type : String
    }
});

const Paymont = mongoose.model("paymont", clientDetail);

module.exports = Paymont;