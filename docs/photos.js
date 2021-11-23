

const PhotosSchema = new mongoose.Schema({
    userName: String,
    url: String,
    titlePhoto: String,
    description: String
})

module.exports = mongoose.model("Photos",PhotosSchema)