const express = require('express');
const rout = express.Router("");
const PersonDetails = require ('./Database');
const ClientData = require ('./Mongoose');
const Person = require('./AdminDB');
const Joi = require('joi')
const sendEmail = require('./SendMail');
const crypto = require('crypto');
const Token = require('./models/Token');

//sendmail

rout.post("/forgetpass", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await PersonDetails.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `http://localhost:3000/resetpassword/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.json({
            message : "password reset link sent to your email account",
            status : true
        });
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

rout.post("/resetpassword/:userId/:token", async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await PersonDetails.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

//Register

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

//login


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


//Add Todos

rout.post("/todo" , async (req,res) => {
    const Added = new ClientData({
        username : req.body.username,
        text : req.body.text
    })
    await Added.save();
    res.json({
        message : "Todo Posted Successfully!!!"
    })

})


//View Todos

rout.post("/tododata" , async (req,res) => {
    const HuserData = ClientData.find({username : req.body.username}, async (err,data) => {
        if(data){
            res.json(data)
        }else{
            res.json("Something Wrong")
        }
    })
})


//todo delete

rout.post("/deletetodo" , (req,res) => {
    var id = req.body.ids;
    ClientData.findByIdAndDelete(id, function (err,data) {
        if(data){
            res.json("todo successfully deleted!!!")
        }else{
            res.json(err)
        }
    })
})


//Update Password

// rout.put("/updatepass" , async (req,res) => {
//     const Attached = req.body.username;

//     const getData = await ClientData.updateOne({username :Attached},{password : req.body.password});
//     if(getData.modifiedCount == 0){
//         res.json({
//             message : "password already used!! use another Password..."
//         })
//     }else{
//         res.json({
//             message : "Password Updated Successfully!!!"
//         })
//     }
// })

rout.put("/PasswordUpdate", async(req,res) => {
    const Assigned = req.body.username;
    const getdatas = await ClientData.updateOne({username : Assigned} , {password : req.body.password});
    if(getdatas.modifiedCount == 0) {
        res.json({
            status : false,
            msg : "Password Already used ! Please try again"
        })
    }
    else {
        res.json({
            status : true,
            msg : "Password updated Successfully"
        })
    }
})

//delete Account

rout.post("/AccDelete" , async (req,res) => {
    const deleteuserData = {username : req.body.username}

    PersonDetails.findOneAndDelete(deleteuserData, (err,data) => {
        if(err){
            console.log(err);
        }else{
            res.json({
                delete : "User Successfully Deleted!!!"
            })
        }
    } )
})

//Admin Register

rout.post("/Admin" , async (req,res) => {
    const User = Person.find({username : req.body.username}, async (err,data) => {
        if(data){
            const Getter = data
            if(Getter == ""){
                const AA = Person.find({email : req.body.email},async (err,edata) => {
                    const Active = edata;
                    if(Active == ""){
                            const register = new Person({
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

//Admin Login

rout.post("/Adminlog", async (req,res) => {
    const Us = Person.find({username:"pk"}, (err,data) => {
        if(data){
            const UDatas = data
            if( UDatas ==""){
                res.json({
                    status : false,
                    error : "user Not found ! please try again"
                })
            }else{
                Person.findOne({username : "pk"},(err,data) => {
                    if(data.password == "pk1"){
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


//get data

rout.get("/getdata" , (req,res,next) => {
    PersonDetails.find().then(result => {
        res.status(200).json({
            data : result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})



module.exports = rout;