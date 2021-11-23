'use strict'
const mongoose = require("mongoose");

const CredentialsSchema = new mongoose.Schema({
    adress: String,
    phone: String,
    email: {
        type:String,
        lowercase: true
    }
})

CredentialsSchema.pre('save',function(next){

    console.log("Condicion");
    if(this.phone.length == 9){
        console.log("Numero de telefono correcto")
        next();
    }else{
        console.log("Tu numero de telefono es erroneo")
    }     
})
module.exports = mongoose.model("Credentials",CredentialsSchema)