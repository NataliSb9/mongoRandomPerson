const { json } = require("body-parser");
const express = require("express");
const app = express();
app.use(express.json());
let mongoose = require("mongoose");
let Photos = require("./photos.js");
let User = require("./user.js");

mongoose.connect("mongodb://localhost:27017/operaciones", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get("/photos", (req, res) => {
  let user = req.query.user;
  Photos.find({ userName: user }, function (err, photos) {
    if (err) {
      res.send("Error");
    } else {
      res.send(photos);
    }
  });
});
app.post("/photos", function (req, res) {
  let photo = new Photos({
    userName: req.body.userName,
    url: req.body.url,
    titlePhoto: req.body.titlePhoto,
    description: req.body.description,
  });
  Photos.create(photo, checkFoto);
  function checkFoto(err, photo) {
    if (err) {
      res.send("error");
    } else {
      res.send(photo);
    }
  }
});
app.del("/photos", (req, res) => {
  if (req.body.title !== undefined) {
    Photos.findOneAndDelete(
      {userName: req.body.userName, title: req.body.title },
      checkFoto
    );
    function checkFoto(err, respuesta) {
      if (err) {
        res.send("error");
      } else {
        res.send("foto eliminada");
      }
    }
  }else {
    Photos.deleteMany({ userName: req.body.userName }, checkFotos);
    function checkFotos(err, respuesta) {
      if (err) {
        res.send("error");
      } else {
        res.send("fotos eliminadas");
      }
    }
  }
});
app.put("/follow", (req, res) => {
  User.findOneAndUpdate(
    { login: req.body.login },
    { follow: req.body.follow },
    sentResponse
  );
  function sentResponse(err, respuesta) {
    if (err) {
      res.send("error");
    } else {
      res.send("Has agregado un follower.");
    }
  }
});
app.put("/unfollow", (req, res) => {
  User.findOneAndUpdate(
    { login: req.body.login, follow: req.body.follow },
    { follow: "" },
    sentResponse
  );
  function sentResponse(err, respuesta) {
    if (err) {
      res.send("error");
    } else {
      res.send("Has eliminado un follower.");
    }
  }
});
app.listen();
