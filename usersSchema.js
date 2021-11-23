const mongoose = require('mongoose')
//Intalar el modulo de mongoose

const UserSchema = new mongoose.Schema({
    name: String,
    gender: String,
    email: String,
    latitude: Number,
    postCode: Number    
})

module.exports = mongoose.model("User", UserSchema)