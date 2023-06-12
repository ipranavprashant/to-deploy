const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const Authenticate = async(req,res,next) => {
    try{
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
    const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
        
    if(!rootUser)
    {
        throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;      //now rootUser is an object that has all the information that the student has entered in the form, we can access any of those by the good old dot(.) operator
    req.userID = rootUser._id;
    next();  //since middleware
    }catch(err){
        res.status(401).send("Unauthorized:No token provided");
        console.log(err);
    }
}

module.exports = Authenticate;