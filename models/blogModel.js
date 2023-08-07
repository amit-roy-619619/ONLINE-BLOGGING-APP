const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "title is required"]
    },
    description: {
        type: String,
        require: [true, "description is required"]
    },
    image: {
        type: String,
        required: "image is required"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true, "userid is required "]
    }
}, { timestamps: true })

const bologModel = mongoose.model("Blog", blogSchema)
module.exports = bologModel;