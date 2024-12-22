// 1.check that both email and pass is entered
// 2.check if user exists or not
// 3.check if password is correct or not
// 4.Login+ COOKIE(JWT)

const userSchema = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config()

exports.login = async (req,resp) => {
    try{
        const { email, pass } = req.body;

        if(!email || !pass){
            return resp.status(400).json({
                success : false,
                msg : "Please Fill all the Details"
            })
        }

        const user = await userSchema.findOne({email});
        if(!user){
            return resp.status(400).json({
                success : true,
                msg : "Please Create Account"
            })
        }

        // console.log("Input Password:", pass);
        // console.log("Stored Hashed Password:", user.pass);


        const isMatched = await bcrypt.compare(pass, user.pass);

        // console.log("IsMatched Password:", isMatched); return BOOLEAN
        
        if(isMatched){
            
            const payload = {
                name : user.name,
                email : user.email,
                id : user._id,
            }

            const options = {
                httpOnly : true,
                // expires : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)  // One day = 24 hours
                expires : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            }

            const token = jwt.sign(payload, process.env.secret);
            resp.cookie("token", token, options).status(200).json({
                success:true,
                msg:"Log in SUccessfully",
                Token : token,
                User : user
            })
        
        }
        else{
            resp.status(400).json({
                success:false,
                msg:"Password Incorrect"
            })
        }
    }
    catch(err){
        resp.status(500).json({
            success : false,
            msg : "Internal Server Error"
        })
    }
}