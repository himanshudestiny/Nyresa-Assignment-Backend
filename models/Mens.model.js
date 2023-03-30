const mongoose = require("mongoose");

const mensSchema = mongoose.Schema({
    image: String,
    category: String,
    title: String,
    price: String
});

const mensModel = mongoose.model("mens", mensSchema);

module.exports = {
    mensModel
}