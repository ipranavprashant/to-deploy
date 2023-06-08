const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new express.Router();
const User=require("../models/userSchema");
const cors = require('cors');

// Enable CORS for all routes
router.use(cors({
    origin:"*",
}));

//Middleware
const middleware=(req,res,next)=>{
    console.log("I am middleware");
    next();
}

router.get("/",(req,res)=>{
    res.send("Home Section");
})

router.post("/register",async(req,res)=>{
    console.log(req.body);
    const {name,email,phone,profession,password,confirmpassword}=req.body;

    if(!name || !email || !phone || !profession || !password || !confirmpassword)
    {
        res.status(400).send("WARNING : Please enter all the required fields first!");
    }
    try{
    const userExist = await User.findOne({email:email});
    if(userExist){
        return res.status(422).send("WARNING : The email is already registered!");
    }
    else if(password!=confirmpassword){
        return res.status(422).send("Password is not matching");
    }
    else{
        const user = new User({name:name,email:email,phone:phone,profession:profession,password:password,confirmpassword:confirmpassword});
        //yha pe
        await user.save();
            res.status(201).send("User registered successfully!");
    }
}catch(err){
    console.log(err);
}
});

router.post('/sign-in',async(req,res)=>{
    try{
        let token;
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send("Please fill all the required");
        }
        const userLogin = await User.findOne({email : email});
        console.log(userLogin);

        if(userLogin){
        const isMatch = await bcrypt.compare(password,userLogin.password);
        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken",token,{
            expires:new Date(Date.now() + 2589200000),        //one month in milliseconds, we write that in ms
            httpOnly:true
        });

        if(!isMatch){
            res.status(400).send("Invalid Credentials");
        }
        else{
            res.send("User Signed In Successfully");
        }
    }
        else{
            res.status(400).send("Invalid Credentials");
        }
    }catch(err){
        console.log(err);
    }
});

module.exports = router;