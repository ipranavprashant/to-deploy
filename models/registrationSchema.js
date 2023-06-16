//This js file creates the schema and models for the Registration-us
const mongoose = require("mongoose");
const validator = require("validator");


//we will first create a schema
const RegistrationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    fathersName:{
        type:String,
        required:true,
        minlength:3
    },
    mothersName:{
        type:String,
        required:true,
        minlength:3
    },
    dob:{
        type:Date
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    standard:{
        type:String,
        required:true
    },
    countryCode:{
        type:String
    },
    phone:{
        type:Number,
        required:true,
        min:10,
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
    }
});

//we will now create a new collection using models
//since it is a class it should be in capital letter

const RegistrationFormUser=new mongoose.model("RegistrationFormUser",RegistrationSchema);

module.exports=RegistrationFormUser;
