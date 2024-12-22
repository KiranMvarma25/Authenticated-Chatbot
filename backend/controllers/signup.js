// 1. input name,email,pass,role
// 2. check if user already exist
// 3. hash the pass
// 4. Create and save user

const userSchema = require('../model/userSchema');
const bcrypt = require('bcrypt');

exports.signup = async(req,resp) => {
    try{
        const { name, email, pass } = req.body;

        if(!name || !email || !pass ){
            return resp.status(400).json({
                success : false,
                msg : "Please Fill all the Details"
            })
        }

        const isPresent = await userSchema.findOne({email});
        if(isPresent){
            return resp.status(400).json({
                success : false,
                msg : "User Already Exixts"
            })
        }

        let hashPass;
        try{
            hashPass = await bcrypt.hash(pass, 10);
        }
        catch(err){
            resp.status(400).json({
                success : false,
                msg : "Error in Hashing the Password"
            })
        }

        const createdUser = await userSchema.create({ name, email, pass : hashPass })
        
        resp.status(200).json({
            success : true,
            msg : "User Created Successfully",
            user : createdUser,
        })

    }
    catch(err){
        resp.status(500).json({
            success : false,
            msg : "Internal Server Error"
        })
    }
}