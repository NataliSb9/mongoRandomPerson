let mongoose = require("mongoose");

let Photos = require("./photos.js");



mongoose.connect('mongodb://localhost:27017/operaciones', {useNewUrlParser: true, useUnifiedTopology: true})


let photos1 = new Photos({
    userName: "Chomsky10",
    url: "https://ichef.bbci.co.uk/news/800/cpsprodpb/8536/production/_103520143_gettyimages-908714708.jpg",
    titlePhoto: "perrete",
    description: "perrete con su chuleton"
})

let photos2 = new Photos({
    userName: "estrellitaCastro",
    url: "https://ichef.bbci.co.uk/news/800/cpsprodpb/8536/production/_103520143_gettyimages-908714708.jpg",
    titlePhoto: "gatete",
    description: "Gatete mirando"
})

 let photos3 = new Photos({
    userName: "alpaca13",
    url: "https://ichef.bbci.co.uk/news/800/cpsprodpb/8536/production/_103520143_gettyimages-908714708.jpg",
    titlePhoto: "es una alpaca no una llama",
    description: "Alpaca en la oficina"
})

function checkRespuesta(err, res){
    if(err){
        console.log("Error: "+ err)
    }else{
        console.log("Todo correcto")
        console.log(res)
    }
}

//1 Guardar una foto


function createPhoto(user,url,title,description){
    let photo = new Photos({
        userName: user,
        url: url,
        title: title,
        description: description
    })
    photo.save(checkRespuesta)
}

createPhoto("hola","mememememe","mandanga", "fantasia")
//2 Agregar una foto

function photosUser(user){
    Photos.find({userName:user}, checkRespuesta)
}

//3 Eliminar foto:

function removePhoto(user, title){
    Photos.findOneAndDelete({userName:user,titlePhoto:title},checkRespuesta)
}
 
//eliminatePhoto("alpaca13","gatico")

//4 eliminar todas las fotos:

function eliminateAllPhotos(user){

    Photos.deleteMany({userName: user},checkRespuesta)
}

//eliminateAllPhotos("alpaca13")

