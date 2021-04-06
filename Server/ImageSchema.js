const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
  images: String,
});

var ImageCollections = mongoose.model("ImageCollections", ImageSchema);
module.exports = ImageCollections;
