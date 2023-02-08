const User = require('../models/user.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
const cookieParser = require('cookie-parser')


module.exports = {
    registerUser:async (req,res)=>{
        try{
            const checkEmail = await User.findOne({ email: req.body.email })
            if (checkEmail) {
                res.status(400).json({errors: {email: {message: "Email is already in use!"}}})
            }
            else {
                const data = new User(req.body)
                const user = await data.save()
                const payload = {_id: user._id, email: user.email, username: user.username}
                const token = jwt.sign(payload, SECRET)
                res.cookie('userToken', token, {httpOnly: true, expires: new Date(Date.now() + 900000)})
                    .json({successMessage: 'userToken ', user: user})
            }
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    loginUser: async (req, res) => {
        const user = await User.findOne({email: req.body.email})
        console.log('logging in: ' + user)
        try {
            if (!user) {
                res.status(400).json({error: "Invalid email/password"})
            }
            else {
                const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
                if (!isPasswordValid) {
                    res.status(400).json({error: "Invalid email/password"})
                }
                else {
                    const payload = {_id: user._id, email: user.email, username: user.username}
                    const userToken = jwt.sign(payload, SECRET)
                    res.cookie('userToken', userToken, {expires: new Date(Date.now() + 900000)})
                        .json({successMessage: 'userToken ', user:user})
                }
            }
        }
        catch(err){
            res.status(400).json({errors: 'Login error'})
        }
    },

    logOutUser:(req,res)=>{
        console.log("logging out")
        res.clearCookie('userToken')
        res.json({successMessage:'User logged out'})
    },

    getLoginUser: async(req, res) => {
        try {
            const user = jwt.verify(req.cookies.userToken, SECRET)
            const currentUser = await User.findOne({_id: user._id})
            res.json(currentUser)
        }
        catch {
            res.status(400).json({errors: 'failed to get logged in user'})
        }
    }
}