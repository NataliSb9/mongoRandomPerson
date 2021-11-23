const mongoose= require("mongoose")
const ProfesionalSchema = new mongoose.Schema({
    name: String,
    age: Number,
    genre: String,
    weight: Number,
    height: Number,
    hairColor: String,
    eyeColor: String,
    isRetired: Boolean,
    nationality: String,
    oscarNumber: Number,
    profession: String
})
module.exports = mongoose.model("Profesional",ProfesionalSchema)