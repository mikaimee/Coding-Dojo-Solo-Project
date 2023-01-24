const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Username is required"],
        uniqueItem:[true, "The username is already taken"]
    },
    email: {
        type:String,
        require: [true, "Email is required"]
    },
    password: {
        type:String,
        require: [true, "Password is required"],
        minLength: [5, "Password must be 5 characters or longer"]
    }
}, {timestamps:true})

// Before save Schema in db, run this function
UserSchema.pre('save', async function(next){
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        console.log('Hashed Password: ', hashedPassword)
        this.password = hashedPassword;
        next()
    }
    catch{
        console.log("Error in save", error)
    }
})

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value)

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password')
    }
    next()
})

module.exports = mongoose.model('User', UserSchema);