const express = require("express");
const app = express();
app.use(express.json());

let mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/imdb', {useNewUrlParser: true, useUnifiedTopology: true})
let Profesional = require("./profesionalSchema.js");

function checkRespuesta(err,res){
    if(err){
        console.log(`Error ${err}`)
    }else{
        console.log("Se ha creado correctamente")
        console.log(res)
    }
}

let actor1 = new Profesional({
    name: "Robert Downey Jr",
    age: 55,
    genre: "masculino",
    weight: 72,
    height: 175,
    hairCorlor: "marron",
    eyeColor: "marron",
    isRetired: false,
    nationality: "USA",
    oscarNumber: 1,
    profession: "actor"
})
//actor1.save(checkRespuesta)

let actor2 = new Profesional ({
    name: "Scarlett Johansson",
    age: 36,
    genre: "femenino",
    weight: 55,
    height: 160,
    hairColor: "rubio",
    eyeColor: "azul",
    isRetired: false,
    nationality: "USA",
    oscarNumber: 1,
    profession: "actriz"
})
//actor2.save(checkRespuesta)

let director1= new Profesional({
    name: "Anthony Russo",
    age: 48,
    genre: "masculino",
    weight: 82,
    height:180,
    hairColor: "gris",
    eyeColor: "azul",
    isRetired: false,
    nationality: "USA",
    oscarNumber: 0,
    profession: "director"
})
//director1.save(checkRespuesta)

let director2= new Profesional({
    name: "Joe Russo",
    age: 50,
    genre: "masculino",
    weight: 82,
    height:180,
    hairColor: "gris",
    eyeColor: "azul",
    isRetired: false,
    nationality: "USA",
    oscarNumber: 0,
    profession: "director"
})
//director2.save(checkRespuesta)

let guionista1 = new Profesional({
    name: "Christopher Markus",
    age: 47,
    genre: "masculino",
    weight: 78,
    height:180,
    hairColor: "gris",
    eyeColor: "verde",
    isRetired: false,
    nationality: "USA",
    oscarNumber: 0,
    profession: "guionista"
})
//guionista1.save(checkRespuesta)

let guionista2 = new Profesional({
    name: "Stephen McFeely",
    age: 52,
    genre: "masculino",
    weight: 90,
    height:187,
    hairColor: "moreno",
    eyeColor: "verde",
    isRetired: false,
    nationality: "USA",
    oscarNumber: 1,
    profession: "guionista"
})
//guionista2.save(checkRespuesta)

/*API REST*/
// profesionales

app.get("/profesionales", function (req, res) {
  if (req.query.id !== undefined) {
    Profesional.findById(req.query.id, checkRespuesta);
    
    function checkRespuesta(err, profesional) {
      if (err) {
        res.send("Error" + err);
      } else {
        res.send(profesional);
      }
    }
  } else {
    Profesional.find(checkRespuesta);
    function checkRespuesta(err, profesional) {
      if (err) {
        res.send("error" + err);
      } else {
        res.send(profesional);
      }
    }
  }
});

app.post("/profesionales", function (req, res) {
  let profesional = new Profesional({
    name: req.body.name,
    age: req.body.age,
    genre: req.body.genre,
    weight: req.body.weight,
    height: req.body.height,
    hairColor: req.body.hairColor,
    eyeColor: req.body.eyeColor,
    isRetired: req.body.isRetired,
    nationality: req.body.nationality,
    oscarNumber: req.body.oscarNumber,
    profession: req.body.profession,
  });
  profesional.save(profesional, checkRespuesta);
  function checkRespuesta(err, profesional) {
    if (err) {
      res.send("error");
    } else {
      res.send(profesional);
    }
  }
});

app.put("/profesionales", function (req, res) {
  let id = req.body._id;
  Profesional.updateOne(
    { _id: id },
    {
      name: req.body.name,
      age: req.body.age,
      genre: req.body.genre,
      weight: req.body.weight,
      height: req.body.height,
      hairColor: req.body.hairColor,
      eyeColor: req.body.eyeColor,
      isRetired: req.body.isRetired,
      nationality: req.body.nationality,
      oscarNumber: req.body.oscarNumber,
      profession: req.body.profession,
    },
    { omitUndefined: true },
    function (err, profesional) {
      if (err) {
        res.send(err);
      } else {
        res.send(`El profesional ha sido modificado correctamente`);
      }
    }
  );
});

app.delete("/profesionales", function (req, res) {
  if (req.body._id !== undefined) {
    Profesional.findByIdAndRemove(req.body._id, checkRespuesta);
    function checkRespuesta(err, profesional) {
      if (err) {
        res.send(err);
      } else res.send(`${profesional.name} ha sido borrado de la base de datos`);
    }
  }
});
app.listen(3000)
