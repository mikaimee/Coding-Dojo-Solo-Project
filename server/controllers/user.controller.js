const User = require('../models/user.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
const cookieParser = require('cookie-parser')


module.exports = {
    registerUser:async (req,res)=>{
        try{
            const newUser = await User.create(req.body)
            const userToken = jwt.sign({_id:newUser._id, email:newUser.email},SECRET)
            res.status(201).cookie('userToken',userToken,{httpOnly:true,expires:new Date(Date.now() + 90000)}).json({successMessage:"User registered",user:newUser})
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    loginUser: async (req, res) => {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            res.status(400).json({error: "Invalid email/password"})
        }
        try {
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            if (!isPasswordValid) {
                res.status(400).json({error: "Invalid email/password"})
            }
            else {
                const userToken = jwt.sign({_id:user._id, email:user.email}, SECRET)
                res.status(201).cookie('userToken',userToken,{httpOnly:true}).json({successMessage:"User logged in", user:user})
            }
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    logOutUser:(req,res)=>{
        res.clearCookie('userToken')
        res.json({success:'User logged out'})
    }
}