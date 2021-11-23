let mongoose = require("mongoose");
let Pelicula = require("./peliSchema.js");
mongoose.connect('mongodb://localhost:27017/imdb',  )
const express = require("express");
const app = express();
app.use(express.json());


function checkRespuesta(err,res){
    if(err){
        console.log(`Error ${err}`)
    }else{
        console.log("Se ha creado correctamente")
        console.log(res)
    }
}

let peli1 = new Pelicula({
    title: "Vengadores: infinity wars",
    releaseYear: 2018,
    actors: ["Robert Downey Jr","Scarlett Johansson"],
    director: ["Anthony Russo","Joe Russo"],
    writer: ["Christopher Markus","Stephen McFeely"],
    productora: "Disney",
    distributor: "Disney",
    nationality: "USA",
    genre: "Action",
    language: "English",
    mainCharacterName: "Tony Stark",
    isMcu: true,
    platform: "Netflix",
})

//peli1.save(checkRespuesta)


app.get("/peliculas", function (req, res) {
  if (req.query.id !== undefined) {
    Pelicula.findById(req.query.id, checkRespuesta);

    function checkRespuesta(err, pelicula) {
      if (err) {
         res.send("Error:" + err);
      } else {
         res.send(pelicula);
      }
    }
  } else {
    Pelicula.find(checkRespuesta);
    function checkRespuesta(err, pelicula) {
      if (err){
         res.send("Error:" + err);
      } else {
          res.send(pelicula)};
    }
  }
});

/*Get que devuelve los datos de los actores de una peli */

app.get("/peliculas/actor", function (req, res) {
    if (req.query.idPelicula !== undefined) {
      Pelicula.findById(req.query.idPelicula, checkRespuesta);

      function checkRespuesta(err, pelicula) {
        if (err) {
           res.send("Error:" + err);
        } else {
           res.send(pelicula.actors)
        }
      }
    } else {
      res.send("No se ha encontrado el actor/ la actriz")
    }
});

app.get("/peliculas/director", function (req, res) {
    if (req.query.idPelicula !== undefined) {
      Pelicula.findById(req.query.idPelicula, checkRespuesta);

      function checkRespuesta(err, pelicula) {
        if (err) {
           res.send("Error:" + err);
        } else {
           res.send(pelicula.director)
        }
      }
    } else {
      res.send("No se ha encontrado al/la director/a")
    }
});


app.get("/peliculas/guionista", function (req, res) {
    if (req.query.idPelicula !== undefined) {
      Pelicula.findById(req.query.idPelicula, checkRespuesta);

      function checkRespuesta(err, pelicula) {
        if (err) {
           res.send("Error:" + err);
        } else {
           res.send(pelicula.writer)
        }
      }
    } else {
      res.send("No se ha encontrado al/la guionista")
    }
});

app.get("/peliculas/productora", function (req, res) {
    if (req.query.idPelicula !== undefined) {
      Pelicula.findById(req.query.idPelicula, checkRespuesta);

      function checkRespuesta(err, pelicula) {
        if (err) {
           res.send("Error:" + err);
        } else {
           res.send(pelicula.productora)
        }
      }
    } else {
      res.send("No se ha encontrado la productora")
    }
});

app.post("/peliculas",function(req,res){
    let movie = new Pelicula ({
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        actors: req.body.actors,
        director: req.body.director,
        writer: req.body.writer,
        productora: req.body.productora,
        distributor: req.body.distributor,
        nationality: req.body.nationality,
        genre: req.body.genre,
        language: req.body.language,
        mainCharacterName: req.body.mainCharacterName,
        isMcu: req.body.isMcu,
        platform: req.body.platform,
    })
    movie.save(movie,checkRespuesta);
    function checkRespuesta(err,movie){
        if(err){
            res.send("Error"+err)
        }else{
            res.send(movie)
        }
    }
})

app.post("/peliculas/actor",function(req,res){
  let id = req.body._id;
  Pelicula.findByIdAndUpdate({_id: id},
    {$push:{actors: req.body.actors}}, function (err,pelicula){
      if(err){
        res.send(err)
      }else{
        res.send(`Se ha introducido un nuevo actor/actriz en la pelicula ${pelicula.title} correctamente`)
      }
    })
})

app.post("/peliculas/director",function(req,res){
  let id = req.body._id;
  Pelicula.findByIdAndUpdate({_id: id},
    {$push:{director: req.body.director}}, function (err,pelicula){
      if(err){
        res.send(err)
      }else{
        res.send(`Se ha introducido un nuevo director/a en la pelicula ${pelicula.title} correctamente`)
      }
    })
})

app.post("/peliculas/guionista",function(req,res){
  let id = req.body._id;
  Pelicula.findByIdAndUpdate({_id: id},
    {$push:{writer: req.body.writer}}, function (err,pelicula){
      if(err){
        res.send(err)
      }else{
        res.send(`Se ha introducido en la pelicula ${pelicula.title} un nuevo guionista correctamente`)
      }
    })
})

app.put("/peliculas", function(req,res){
  let id = req.body._id;
  Pelicula.updateOne(
    {_id: id},
    {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      actors: req.body.actors,
      director: req.body.director,
      writer: req.body.writer,
      productora: req.body.productora,
      distributor: req.body.distributor,
      nationality: req.body.nationality,
      genre: req.body.genre,
      language: req.body.language,
      mainCharacterName: req.body.mainCharacterName,
      isMcu: req.body.isMcu,
      platform: req.body.platform,
    },
    { omitUndefined: true },
    function (err, pelicula) {
      if (err) {
        res.send(err);
      } else {
        res.send(pelicula);
      }
    }
  )
})

app.delete("/peliculas",function(req,res){
  if(req.body._id !== undefined){
    Pelicula.findOneAndRemove({_id:req.body._id},checkRespuesta)
    function checkRespuesta(err,pelicula){
      if(err){
        res.send(err)
      }else{
        res.send(`La pelicula ${pelicula.title} ha sido eliminada correctamente de la base de datos`)
      }
    }
  }
})

app.delete("/peliculas/actor",function(req,res){
  if(req.body._id !== undefined){
    Pelicula.findOneAndUpdate({_id:req.body._id}, {$pull:{actors: req.body.actors}},checkRespuesta)
    function checkRespuesta(err,pelicula){
      if(err){
        res.send(err)
      }else{
        res.send(`El profesional indicado ha sido borrado de la pelicula ${pelicula.title} correctamente`)
      }
    }
  }
})

app.delete("/peliculas/director",function(req,res){
  if(req.body._id !== undefined){
    Pelicula.findOneAndUpdate({_id:req.body._id}, {$pull:{director: req.body.director}},checkRespuesta)
    function checkRespuesta(err,pelicula){
      if(err){
        res.send(err)
      }else{
        res.send(`El profesional indicado ha sido borrado de la pelicula ${pelicula.title} correctamente`)
      }
    }
  }
})


app.delete("/peliculas/guionista",function(req,res){
  if(req.body._id !== undefined){
    Pelicula.findOneAndUpdate({_id:req.body._id}, {$pull:{writer: req.body.writer}},checkRespuesta)
    function checkRespuesta(err,pelicula){
      if(err){
        res.send(err)
      }else{
        res.send(`El profesional indicado ha sido borrado de la pelicula ${pelicula.title} correctamente`)
      }
    }
  }
})
app.listen(3000)





