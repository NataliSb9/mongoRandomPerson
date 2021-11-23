let mongoose = require("mongoose");
let Profile = require("./profile")
mongoose.connect('mongodb://localhost:27017/reto2Mongoose', {useNewUrlParser: true})

let profile1 = new Profile({
    name:"Natalie",
    surname: "Perez",
    dateOfBirth: new Date(1992,9,12),
    comments: "Estudio programacion",
    rol:"desempleada"
})

profile1.save(checkRespuesta)

function checkRespuesta(err, res){
    if(err){
        console.log("Error: "+ err)
    }else{
        console.log("El documento se ha creado correctamente")
        console.log(res)
    }
}