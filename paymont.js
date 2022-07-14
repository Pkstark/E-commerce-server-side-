const express = require('express');
const { default: mongoose } = require('mongoose');

const CDatas = mongoose.Schema;

const clientDetail = new CDatas({
    username: String,
    name: String,
    prize: String,
    photo: String,
    paid: String,
    Approved: String,
});

const Paymont = mongoose.model("paymont", clientDetail);

module.exports = Paymont;