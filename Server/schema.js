const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  first_name: String,
  last_name: String,
});

var Collection = mongoose.model("Collection", Schema);
module.exports = Collection;
