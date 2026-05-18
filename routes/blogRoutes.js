const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');
const { createBlog, getAllBlogs, getUserBlogs, getSingleBlog, updateBlog, deleteBlog, searchBlogs } = require('../controllers/blogController');

router.get('/test', (req, res) => res.json({ success: true, message: 'Blog router working!' }));
router.get('/all', getAllBlogs);
router.get('/my-blogs', protect, getUserBlogs);
router.get('/search', searchBlogs);
router.get('/:id', getSingleBlog);
router.post('/create', protect, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createBlog);
router.put('/:id', protect, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;