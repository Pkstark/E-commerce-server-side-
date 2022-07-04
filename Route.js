const express = require('express');
const rout = express.Router("");
const PersonDetails = require ('./Database');

rout.post("/register" , async (req,res) => {
    const User = PersonDetails.find({username : req.body.username}, async (err,data) => {
        if(data){
            const Getter = data
            if(Getter == ""){
                const Person = PersonDetails.find({email : req.body.email},async (err,edata) => {
                    const Active = edata;
                    if(Active == ""){
                            const register = new PersonDetails({
                            username : req.body.username,
                            email : req.body.email,
                            password : req.body.password
                        })
                        await register.save();
                        res.json({
                            message : "Registered Successfully ! please Login..."
                        });
                    }
                    else{
                        res.json({
                            error : "email already exist ! Please use another mail Id"
                        })
                    }
                })
            }
            else{
                res.json({
                    error : "Username Already exist ! Please use another mail Id"
                })
            }
        }
    })
})


rout.post("/login", async (req,res) => {
    const Us = PersonDetails.find({username:req.body.username}, (err,data) => {
        if(data){
            const UDatas = data
            if( UDatas ==""){
                res.json({
                    status : false,
                    error : "user Not found ! please try again"
                })
            }else{
                PersonDetails.findOne({username : req.body.username},(err,data) => {
                    if(data.password == req.body.password){
                        res.json({
                            username : data.username,
                            password : data.password
                        })
                    }
                    else{
                        res.json({
                            status : false,
                            error : "Invalid password ! try again..." 
                        })
                    }
                })
            }
        }
    })
})


module.exports = rout;