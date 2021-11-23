/****dependencias****/
const express= require('express');
let mongoose = require("mongoose");
const app = express();
let User = require('./usersSchema');

/*con mongoose.connect especifico donde se debe crear la base de datos. Si ejecuto el archivo teniendo solo el apartado de dependencies puesto y la BBDD no esta creada, al ejecutar el archivo se crea sola*/

mongoose.connect('mongodb://localhost:27017/pepe', 
    function(err){
        if(err){
        throw err; 
        }else{
        console.log('Te has conectado a MongoDB');
        }
    }
)



