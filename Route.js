const express = require('express');
const rout = express.Router("");
const PersonDetails = require('./Database');
const ClientData = require('./Mongoose');
const Person = require('./AdminDB');
const Joi = require('joi');
const Shirts = require('./Shirts');
const Shoes = require('./Shoes');
const sendEmail = require('./SendMail');
const crypto = require('crypto');
const Token = require('./models/Token');
const Product = require('./ImageDb');
const path = require('path');
const multer = require('multer');
const Mobile = require('./Mobile');
const Cart = require('./Card');
const Paymont = require('./paymont');


rout.get("/dd", (req, res, next) => {
    PersonDetails.find().then((result) => res.json(result)).catch((err) => res.json(err))
})


//storage Image

const Storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }

});


// const fileFilter = (req,file,cb) => {
//     const allowedType = ["image/jpeg" , "image/png" , "image/jpg"];
//     if(allowedType.includes(file.mimetype)) {
//         cb(null,true)
//     }
//     else {
//         cb(null,false)
//     }
// }

const upload = multer({ storage: Storage });


//Mobile routes 


rout.post('/productupload', upload.single("photo"), (req, res) => {
    const name = req.body.name;
    const prize = req.body.prize;
    const offerprize = req.body.offerprize;
    const photo = req.file.path

    const newUserData = {
        name,
        prize,
        offerprize,
        photo
    }

    const newProduct = new Product(newUserData);

    newProduct.save()
        .then(() => res.json({
            message: "Product added Successfully"
        }))
        .catch((err) => res.json("error" + err))
})



//Shirts items 
rout.post('/Shirts', upload.single("photo"), (req, res) => {
    const name = req.body.name;
    const prize = req.body.prize;
    const offerprize = req.body.offerprize;
    const photo = req.file.path

    const newUserData = {
        name,
        prize,
        offerprize,
        photo
    }

    const newProduct = new Shirts(newUserData);

    newProduct.save()
        .then(() => res.json({
            message: "Product added Successfully"
        }))
        .catch((err) => res.json("error" + err))
})


//shoe items

rout.post('/shoe', upload.single("photo"), (req, res) => {
    const name = req.body.name;
    const prize = req.body.prize;
    const offerprize = req.body.offerprize;
    const photo = req.file.path

    const newUserData = {
        name,
        prize,
        offerprize,
        photo
    }

    const newProduct = new Shoes(newUserData);

    newProduct.save()
        .then(() => res.json({
            message: "Product added Successfully"
        }))
        .catch((err) => res.json("error" + err))
})

//mobile get data
rout.get("/data", (req, res, next) => {
    Product.find().then((result) => res.json(result)).catch((err) => res.json(err))
})

// shirt get data

rout.get("/sdata", (req, res, next) => {
    Shirts.find().then((result) => res.json(result)).catch((err) => res.json(err))
})

//shoe data

rout.get("/shdata", (req, res, next) => {
    Shoes.find().then((result) => res.json(result)).catch((err) => res.json(err))
})


// delete Product


rout.post("/productdel/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted.");
    } catch (err) {
        console.log(err);
    }
})

//delete shoes


rout.post("/shoedel/:id", async (req, res) => {
    try {
        await Shoes.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted.");
    } catch (err) {
        console.log(err);
    }
})

//shirt delete

rout.post("/shirtdel/:id", async (req, res) => {
    try {
        await Shirts.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted.");
    } catch (err) {
        console.log(err);
    }
})


//update mobile


rout.put("/mobileup/:id", (req, res, next) => {
    Product.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            prize: req.body.prize,
            offerprize : req.body.offerprize
        }
    }).then((result) => {
        res.json({
            message: "successfully updateded"
        })
    }).catch((err) => {
        res.json(err);
    })
})


//update shoe

rout.put("/shoeup/:id", (req, res, next) => {
    Shoes.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            prize: req.body.prize,
            offerprize : req.body.offerprize
        }
    }).then((result) => {
        res.json({
            message: "successfully updateded"
        })
    }).catch((err) => {
        res.json(err);
    })
})


//shirt update


rout.put("/shirtup/:id", (req, res, next) => {
    Shirts.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            prize: req.body.prize,             
            offerprize : req.body.offerprize
        }
    }).then((result) => {
        res.json({
            message: "successfully updateded"
        })
    }).catch((err) => {
        res.json(err);
    })
})


//Add to Cart

rout.post('/addcart/:id', async (req, res) => {
    try {
        const List = new Cart({
            username: req.body.username,
            name: req.body.name,
            prize: req.body.prize,
            offerprize : req.body.offerprize,
            photo: req.body.photo
        });
        const createData = await List.save();
        if (createData) {
            res.send({
                message: "added to cart",
                createData,
            });
        }
    } catch (error) {
        console.log(error);
    }
})


// cart Shirt

rout.post('/addcartsh/:id', async (req, res) => {
    try {
        const List = new Cart({
            username: req.body.username,
            name: req.body.name,
            prize: req.body.prize,
            offerprize : req.body.offerprize,
            photo: req.body.photo
        });
        const createData = await List.save();
        if (createData) {
            res.send({
                message: "added to cart",
                createData,
            });
        }
    } catch (error) {
        console.log(error);
    }
})


// cart Shoe

rout.post('/addcartshoe/:id', async (req, res) => {
    try {
        const List = new Cart({
            username: req.body.username,
            name: req.body.name,
            prize: req.body.prize,
            offerprize : req.body.offerprize,
            photo: req.body.photo
        });
        const createData = await List.save();
        if (createData) {
            res.send({
                message: "added to cart",
                createData,
            });
        }
    } catch (error) {
        console.log(error);
    }
})

//get card

rout.post("/cartdata", async (req, res) => {
    const HuserData = Cart.find({ username: req.body.username }, async (err, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json("Something Wrong")
        }
    })
})

// client Order

rout.post("/orderdata", async (req, res) => {
    const HuserData = Paymont.find({ username: req.body.username }, async (err, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json("Something Wrong")
        }
    })
})

// Client Order Cancel

rout.post("/orderdel/:id", async (req, res) => {
    try {
        await Paymont.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted.");
    } catch (err) {
        console.log(err);
    }
})

//delete cart

rout.post("/cartdel/:id", async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted.");
    } catch (err) {
        console.log(err);
    }
})

// payment


rout.post("/payment", async (req, res) => {
    const Added = new Paymont({
        username: req.body.username,
        name: req.body.name,
        prize: req.body.prize,
        photo: req.body.photo,
        offerprize : req.body.offerprize,
        paid: "Paid",
        Approved: "Order Approved"
    })
    await Added.save();
    res.json({
        message: "Paymont Successfully!!!"
    })
})



//sendmail
rout.post("/forgetpass", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await PersonDetails.findOne({ email: req.body.email });
        if (!user)
            return res.json({
                message: "user email id not work"
            })

        let token = await Token.findOne({ userId: user.username });
        if (!token) {
            token = await new Token({
                userId: user.username,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `http://localhost:3000/resetpassword/${user.username}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.json({
            status: true,
            message: " password reset link send your email account"
        })
    } catch (error) {
        res.json({
            message: "An error occuried"
        });
        console.log(error);
    }
});

rout.post("/resetpassword/:userId/:token", async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await PersonDetails.findOneAndUpdate(req.params.userId);
        if (!user) return res.status(400).json({
            message: "invaliad link or expired"
        });

        const token = await Token.findOne({
            userId: user.username,
            token: req.params.token,
        });
        if (!token) return res.status(400).json({
            message: "Invalid link or expired"
        });

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.json({
            status: true,
            message: "password reset successfully"
        });
    } catch (error) {
        res.json({
            status: false,
            message: "An error occured"
        });
        console.log(error);
    }
});

//Register

rout.post("/register", async (req, res) => {
    const User = PersonDetails.find({ username: req.body.username }, async (err, data) => {
        if (data) {
            const Getter = data
            if (Getter == "") {
                const Person = PersonDetails.find({ email: req.body.email }, async (err, edata) => {
                    const Active = edata;
                    if (Active == "") {
                        const register = new PersonDetails({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        })
                        await register.save();
                        res.json({
                            message: "Registered Successfully ! please Login..."
                        });
                    }
                    else {
                        res.json({
                            error: "email already exist ! Please use another mail Id"
                        })
                    }
                })
            }
            else {
                res.json({
                    error: "Username Already exist ! Please use another mail Id"
                })
            }
        }
    })
})

//login


rout.post("/login", async (req, res) => {
    const Us = PersonDetails.find({ username: req.body.username }, (err, data) => {
        if (data) {
            const UDatas = data
            if (UDatas == "") {
                res.json({
                    status: false,
                    error: "user Not found ! please try again"
                })
            } else {
                PersonDetails.findOne({ username: req.body.username }, (err, data) => {
                    if (data.password == req.body.password) {
                        res.json({
                            username: data.username,
                            password: data.password
                        })
                    }
                    else {
                        res.json({
                            status: false,
                            error: "Invalid password ! try again..."
                        })
                    }
                })
            }
        }
    })
})


//Add Todos

rout.post("/todo", async (req, res) => {
    const Added = new ClientData({
        username: req.body.username,
        text: req.body.text
    })
    await Added.save();
    res.json({
        message: "Todo Posted Successfully!!!"
    })

})


//View Todos

rout.post("/tododata", async (req, res) => {
    const HuserData = ClientData.find({ username: req.body.username }, async (err, data) => {
        if (data) {
            res.json(data)
        } else {
            res.json("Something Wrong")
        }
    })
})


//todo delete

rout.post("/deletetodo", (req, res) => {
    var id = req.body.ids;
    ClientData.findByIdAndDelete(id, function (err, data) {
        if (data) {
            res.json("todo successfully deleted!!!")
        } else {
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

rout.put("/PasswordUpdate", async (req, res) => {
    const Assigned = req.body.username;
    const getdatas = await ClientData.updateOne({ username: Assigned }, { password: req.body.password });
    if (getdatas.modifiedCount == 0) {
        res.json({
            status: false,
            msg: "Password Already used ! Please try again"
        })
    }
    else {
        res.json({
            status: true,
            msg: "Password updated Successfully"
        })
    }
})

//delete Account

rout.post("/AccDelete", async (req, res) => {
    const deleteuserData = { username: req.body.username }

    PersonDetails.findOneAndDelete(deleteuserData, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                delete: "User Successfully Deleted!!!"
            })
        }
    })
})

//Admin Register

rout.post("/Admin", async (req, res) => {
    const User = Person.find({ username: req.body.username }, async (err, data) => {
        if (data) {
            const Getter = data
            if (Getter == "") {
                const AA = Person.find({ email: req.body.email }, async (err, edata) => {
                    const Active = edata;
                    if (Active == "") {
                        const register = new Person({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        })
                        await register.save();
                        res.json({
                            message: "Registered Successfully ! please Login..."
                        });
                    }
                    else {
                        res.json({
                            error: "email already exist ! Please use another mail Id"
                        })
                    }
                })
            }
            else {
                res.json({
                    error: "Username Already exist ! Please use another mail Id"
                })
            }
        }
    })
})

//Admin Login

rout.post("/Adminlog", async (req, res) => {
    const Us = Person.find({ username: "pk" }, (err, data) => {
        if (data) {
            const UDatas = data
            if (UDatas == "") {
                res.json({
                    status: false,
                    error: "user Not found ! please try again"
                })
            } else {
                Person.findOne({ username: "pk" }, (err, data) => {
                    if (data.password == "pk1") {
                        res.json({
                            username: data.username,
                            password: data.password
                        })
                    }
                    else {
                        res.json({
                            status: false,
                            error: "Invalid password ! try again..."
                        })
                    }
                })
            }
        }
    })
})


//get data

rout.get("/getdata", (req, res, next) => {
    PersonDetails.find().then(result => {
        res.status(200).json({
            data: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})


//Admin Add User

rout.post("/adduser", async (req, res) => {
    const User = PersonDetails.find({ username: req.body.username }, async (err, data) => {
        if (data) {
            const Getter = data
            if (Getter == "") {
                const Person = PersonDetails.find({ email: req.body.email }, async (err, edata) => {
                    const Active = edata;
                    if (Active == "") {
                        const register = new PersonDetails({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        })
                        await register.save();
                        res.json({
                            message: "Registered Successfully ! please Login..."
                        });
                    }
                    else {
                        res.json({
                            error: "email already exist ! Please use another mail Id"
                        })
                    }
                })
            }
            else {
                res.json({
                    error: "Username Already exist ! Please use another mail Id"
                })
            }
        }
    })
})

//Delete user


rout.post("/deluser", async (req, res) => {
    const deleteuserData = { username: req.body.username }

    PersonDetails.findOneAndDelete(deleteuserData, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                delete: "User Successfully Deleted!!!"
            })
        }
    })
})

//Admin update user

rout.put("/updateuser/:id", (req, res, next) => {
    PersonDetails.findOneAndUpdate({ username: req.params.id }, {
        $set: {
            email: req.body.email
        }
    }).then((result) => {
        res.json({
            message: "successfully updateded"
        })
    }).catch((err) => {
        res.json(err);
    })
})

//Admin View Client Orders


rout.get("/adminclientdata", (req, res, next) => {
    Paymont.find().then((result) => res.json(result)).catch((err) => res.json(err))
})


//Admin Order cancel

rout.post("/adminordercancel/:id", async (req, res) => {
    try {
        await Paymont.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted.");
    } catch (err) {
        console.log(err);
    }
})


module.exports = rout;