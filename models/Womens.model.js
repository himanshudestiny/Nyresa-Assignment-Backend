const mongoose = require("mongoose");

const womensSchema = mongoose.Schema({
    image: String,
    category: String,
    title: String,
    price: String
});

const womensModel = mongoose.model("womens", womensSchema);

module.exports = {
    womensModel
}