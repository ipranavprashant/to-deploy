//This js file creates the schema and models for the collection
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//we will first create a schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
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
    countryCode:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        min:10,
        // max:10,
        // unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:[3,"The password is too short"]
    },
    confirmpassword:{
        type:String,
        required:true,
        minlength:[3,"The password is too short"]
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

userSchema.pre("save",async function(next){     //we using normal function because this. method is not usable in fat arrow function
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword,12);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this.id},process.env.SECRET_KEY);                 //jwt.sign(payload,secretOrPrivateKey,[options,callback])
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

//we will now create a new collection using models
//since it is a class it should be in capital letter

const User=new mongoose.model("User",userSchema);

module.exports=User;
