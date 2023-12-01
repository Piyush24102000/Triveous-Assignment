const mongoose = require('mongoose')

let categorySchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
})
module.exports = mongoose.model.categoryModel || mongoose.model('categoryModel', categorySchema)