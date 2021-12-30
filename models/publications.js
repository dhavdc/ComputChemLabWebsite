const mongoose = require("mongoose");


const publicationsSchema = mongoose.Schema({

    number: Number,
    title: String,
    description: String,
    authors: String,
    date: Number,
    imagePath: String,
    imageDescription: String,
    pmcid: String,
    doi: String,
    plink: String,
    dlink: String,
    tags: [String],
    tagsColor: [String]

});

publicationsSchema.index({'$**': 'text'});



module.exports = mongoose.model("publications", publicationsSchema);