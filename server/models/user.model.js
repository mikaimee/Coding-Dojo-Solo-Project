const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Username is required"],
        uniqueItem:[true, "The username is already taken"],
        minLength: [2, "Username must be at least two (2) characters long."]
    },
    email: {
        type:String,
        require: [true, "Email is required"]
    },
    password: {
        type:String,
        require: [true, "Password is required"],
        minLength: [5, "Password must be 5 characters or longer"]
    },
    profilePic :{
        type: String
    }
}, {timestamps:true})

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(e => this._confirmPassword = e)

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password')
    }
    next()
})

UserSchema.pre('save', async function(next){
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        console.log('Hashed Password: ', hashedPassword)
        this.password = hashedPassword;
        next()
    }
    catch (err) {
        console.log("Error in save ", err)
    }
})

module.exports = mongoose.model('User', UserSchema);