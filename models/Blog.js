const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    video: { type: String, default: '' },
    videoLink: { type: String, default: '' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

blogSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Blog', blogSchema);