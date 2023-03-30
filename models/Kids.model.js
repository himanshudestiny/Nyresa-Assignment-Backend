const mongoose = require("mongoose");

const kidsSchema = mongoose.Schema({
    image: String,
    category: String,
    title: String,
    price: String
});

const kidsModel = mongoose.model("kids", kidsSchema);

module.exports = {
    kidsModel
}