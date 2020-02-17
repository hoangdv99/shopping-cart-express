var mongoose = require('mongoose');

//Category Schema
var categorySchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    slug: {
        type: String
    }
    });

var Category = module.exports = mongoose.model('Category', categorySchema);
