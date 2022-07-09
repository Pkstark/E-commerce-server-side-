const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const url = "mongodb://localhost:27017/customers";
const rout = require('./Route');
const bodyparser = require('body-parser');
const path = require('path');
const morgan = require('morgan')

mongoose.connect(url).then(()=>{
    console.log("mongodb connected suucessfully!!!")
})

const app = express();
app.use(express.json());
app.use(cors());
app.use("/",rout);
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({
    extended : true
}))

app.use(bodyparser.urlencoded({
    extended:true,
}))



app.listen(8000,()=> console.log("Port started successfully"));
