const mongoose = require('mongoose');

const tagsSchema = mongoose.Schema({
    tag: {name: String, color: String}
});

module.exports = mongoose.model('Tags', tagsSchema);