const express = require('express');
const { default: mongoose } = require('mongoose');

const CDatas = mongoose.Schema;

const clientDetail = new CDatas({
    username: String,
    flatno : {
        type : String,
        required : true
    },
    address1 : {
        type : String,
        required : true
    },
    address2 : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    pincode : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    limit : {
        type : Number,
        default : 0
    },
    name : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        required : true
    },
    prize : {
        type : String,
        required : true
    },
    offerprize : {
        type : String,
        require : true
    },
    paid : {
        type : String,
        required : true
    },
    Approved : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    totalprize : {
        type : String,
        requiree : true
    }
});

const Overall = mongoose.model("overall", clientDetail);

module.exports = Overall;