const mongoose = require("mongoose");


const publicationsSchema = mongoose.Schema({

    name: String,
    email: String,
    subject: String,
    message: String,
});



module.exports = mongoose.model("publications", publicationsSchema);