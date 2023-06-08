const express = require("express");
const router = new express.Router();
const ContactFormUser=require("../models/contactSchema");
const cors = require('cors');

// Enable CORS for all routes
router.use(cors({
    origin:"*",
}));

router.post('/message-me',async(req,res)=>{
    console.log(req.body);
    const {name,phone,email,message}=req.body;

    if(!name || !email || !phone || !message)
    {
        res.status(400).send("WARNING : Please enter all the required fields first!");
    }
        const contactFormUser = new ContactFormUser({name:name,phone:phone,email:email,message:message});
        await contactFormUser.save();
            res.status(201).send("Message sent successfully");
});

module.exports = router;

