let mongoose = require("mongoose");
const user = require("./user.js");
let User = require("./user.js");
mongoose.connect('mongodb://localhost:27017/operaciones', {useNewUrlParser: true, useUnifiedTopology: true})

let origen = new User({
    login: "origen",
    password: "#bikiniKill",
    name: "Alba",
    surname: "Torres",
    dateOfBirth: new Date (12,02,1989),
    comments: "QueenB",
    rol: "estudiante",
    adress:"Calle de las Marquesas 5",
    phone: "645458228",
    email: "Albatorres@gmail.com",
    follow: "destino"
})
let destino = new User({
    login: "destino",
    password: "#AlfaOmega",
    name: "Estrella",
    surname: "Torres",
    dateOfBirth: new Date (12,02,1989),
    comments: "nada que objetar",
    rol: "estudiante",
    adress:"Avenida de las Marquesas 5",
    phone: "645458228",
    email: "estrellatorres@gmail.com",
    follow: ""
})

let user3 = new User({
    login: "theDogtor",
    password: "#Almendra",
    name: "Fernando",
    surname: "Simon",
    dateOfBirth: new Date (12,02,1989),
    comments: "Lo siento es que me acabo de comer una almendra",
    rol: "Medico",
    adress:"Avenida de la Pochez 8",
    phone: "645458228",
    email: "medicoperopaciente@gmail.com",
    follow: "covid"
})


function checkRespuesta(err, res){
    if(err){
        console.log("Error: "+ err)
    }else{
        console.log("El user se ha creado correctamente")
        console.log(res)
    }
}

destino.save(checkRespuesta)

//Metodos para usuarios:
//Seguir a un usuario, uso find and update

function followUser(filter,update){
    User.findOneAndUpdate({login:filter}, {follow:update},checkRespuesta)
}
//prueba funcion:
//followUser('destino','origen')

function unfollowUser(user, followed){
    User.findOneAndUpdate({login: user, follow: followed},{follow:null},checkRespuesta)
}
//prueba funcion:
//unfollowUser("origen","destino")