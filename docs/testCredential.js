let mongoose = require("mongoose");
let Credentials = require("./credentials");
mongoose.connect('mongodb://localhost:27017/reto2Mongoose', {useNewUrlParser: true})

let credentials1 = new Credentials({
    adress:"Avenida de las Marquesas 5",
    phone: "64582555",
    email: "natalita@gmail.com"
})

credentials1.save(checkRespuesta)

function checkRespuesta(err, res){
    if(err){
        console.log("Error: "+ err)
    }else{
        console.log("El documento se ha creado correctamente")
        console.log(res)
    }
}

