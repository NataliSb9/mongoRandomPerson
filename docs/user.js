const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    login: String,
    password: {
        type: String,
        validate: [
            function(password){
                return password.includes("#")
            }
        ]  
    },
    name:String,
    surname: String,
    dateOfBirth:Date,
    comments: String,
    rol: String,
    adress: String,
    phone: String,
    email: {
        type:String,
        lowercase: true
    },
    follow: String,
})
 

module.exports = mongoose.model("User", UserSchema)

