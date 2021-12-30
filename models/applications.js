const mongoose = require("mongoose");


const publicationsSchema = mongoose.Schema({

    number: Number,
    title: String,
    description: String,
    authors: String,
    link: String,
    date: Number

});



module.exports = mongoose.model("publications", publicationsSchema);