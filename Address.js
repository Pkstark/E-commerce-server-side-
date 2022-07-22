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
    select : {
        type : Boolean,
        default :true
    }
});

const Address = mongoose.model("address", clientDetail);

module.exports = Address;