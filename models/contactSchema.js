//This js file creates the schema and models for the contact-us
const mongoose = require("mongoose");
const validator = require("validator");


//we will first create a schema
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    phone:{
        type:Number,
        required:true,
        min:15,
        // max:10,
        // unique:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"The entered Email ID is already registered"],    //This is an error message
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Entered Email is Invalid");
            }
        },
    },
    message:{
        type:String
    }
});

//we will now create a new collection using models
//since it is a class it should be in capital letter

const ContactFormUser=new mongoose.model("ContactFormUser",contactSchema);

module.exports=ContactFormUser;
