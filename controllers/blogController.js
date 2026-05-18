const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
    try {
        const { title, description, videoLink } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Title and description required' });
        }
        
        let imagePath = '', videoPath = '';

        if (req.files && req.files.image) {
            imagePath = `/uploads/${req.files.image[0].filename}`;
        }
        if (req.files && req.files.video) {
            videoPath = `/uploads/${req.files.video[0].filename}`;
        }

        const blog = await Blog.create({
            title,
            description,
            image: imagePath,
            video: videoPath,
            videoLink: videoLink || '',
            author: req.user._id,
            authorName: req.user.name
        });

        res.status(201).json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author', 'name email profilePicture');
        res.status(200).json({ success: true, count: blogs.length, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: blogs.length, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email bio profilePicture');
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.status(200).json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        
        const { title, description, videoLink } = req.body;
        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.videoLink = videoLink || blog.videoLink;
        blog.updatedAt = Date.now();
        
        await blog.save();
        res.status(200).json({ success: true, message: 'Blog updated', blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        
        await blog.deleteOne();
        res.status(200).json({ success: true, message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const searchBlogs = async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword) return res.status(400).json({ success: false, message: 'Keyword required' });
        
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 }).populate('author', 'name email profilePicture');
        
        res.status(200).json({ success: true, count: blogs.length, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createBlog, getAllBlogs, getUserBlogs, getSingleBlog, updateBlog, deleteBlog, searchBlogs };