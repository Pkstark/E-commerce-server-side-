const express = require('express');
const { default: mongoose } = require('mongoose');

const CDatas = mongoose.Schema;

const clientDetail = new CDatas ({
    username : String,
    text : String
});

const ClientData = mongoose.model("tasks", clientDetail);

module.exports = ClientData;