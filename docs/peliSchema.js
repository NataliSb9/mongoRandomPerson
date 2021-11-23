const mongoose = require("mongoose")

const PeliculaSchema = new mongoose.Schema({
    title: String,
    releaseYear: String,
    actors: [String],
    director: [String],
    writer: [String],
    productora: String,
    distributor: String,
    nationality: String,
    genre: String,
    language: String,
    mainCharacterName: String,
    isMcu: Boolean,
    platform: String,
})
module.exports= mongoose.model("Peliculas",PeliculaSchema)
