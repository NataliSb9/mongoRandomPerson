'use strict'
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    name: {
        type:String,
        enum: ["Nat", "Natalie", "Natalia"],
        },
    surname: String,
    
    dateOfBirth: {
        type:Date,
        validate: [
            function(dateOfBirth){
                let date = new Date (2003,1,1)
                return dateOfBirth <= date;
            },
            'No eres mayor de 18']
        },
    comments: String,
    rol: String,
})
module.exports = mongoose.model("Profile",ProfileSchema);