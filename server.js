const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');  

dotenv.config();

const app = express();

// Middleware
// CORS setup
const allowedOrigins = [
    'http://localhost:3000',
    'https://blog-platform-frontend-delta.vercel.app'
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', ]
}));

// Handle preflight requests
// app.options('*', cors());


// app.use(cors({ origin: ['http://localhost:3000', 'https://blog-platform-backend-production-2df3.up.railway.app'], credentials: true }));
// app.use(cors({ 
//     origin: ['http://localhost:3000', 'https://blog-platform-frontend-delta.vercel.app'],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============ MULTER SETUP ============
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }
});

// ============ MODELS ============
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    bio: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    video: { type: String, default: '' },
    videoLink: { type: String, default: '' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog', blogSchema);

// ============ AUTH MIDDLEWARE ============
const protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, please login' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// ============ AUTH ROUTES ============
app.get('/api/test', (req, res) => {
    res.json({ success: true, message: 'Server is running! 🚀' });
});

app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(201).json({ 
            success: true, 
            user: { id: user._id, name: user.name, email: user.email } 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production'
        });
        
        res.json({ 
            success: true, 
            user: { id: user._id, name: user.name, email: user.email } 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/auth/logout', (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production'
    });
    res.json({ success: true, message: 'Logged out successfully' });
});

// ============ FORGOT PASSWORD ROUTES ============

// Forgot Password - DEMO MODE (returns token in response)
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found with this email' });
        }
        
        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();
        
        // Create reset URL
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        
        // For demo, return the URL in response
        res.json({ 
            success: true, 
            message: 'Password reset link generated',
            resetUrl: resetUrl,
            token: resetToken
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Reset Password
app.put('/api/auth/reset-password/:token', async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============ BLOG ROUTES ============

// Create blog - FORM-DATA WITH FILE UPLOAD
app.post('/api/blogs/create', protect, upload.any(), async (req, res) => {
    try {
        console.log('=== CREATE BLOG REQUEST ===');
        console.log('Body:', req.body);
        
        const title = req.body.title;
        const description = req.body.description;
        const videoLink = req.body.videoLink || req.body.url || '';
        
        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Title and description required' });
        }
        
        let imagePath = '';
        let videoPath = '';
        
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                if (file.fieldname === 'image') {
                    imagePath = `/uploads/${file.filename}`;
                }
                if (file.fieldname === 'video') {
                    videoPath = `/uploads/${file.filename}`;
                }
            }
        }
        
        const blog = await Blog.create({
            title,
            description,
            image: imagePath,
            video: videoPath,
            videoLink: videoLink,
            author: req.user._id,
            authorName: req.user.name
        });
        
        res.status(201).json({ success: true, blog });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all blogs
app.get('/api/blogs/all', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author', 'name email profilePicture');
        res.json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get my blogs
app.get('/api/blogs/my-blogs', protect, async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// SEARCH BLOGS - MUST BE BEFORE :id ROUTE
app.get('/api/blogs/search', async (req, res) => {
    try {
        const { keyword } = req.query;
        console.log('Search keyword:', keyword);
        
        if (!keyword) {
            return res.status(400).json({ success: false, message: 'Keyword required' });
        }
        
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 }).populate('author', 'name email');
        
        console.log(`Found ${blogs.length} blogs for keyword: ${keyword}`);
        res.json({ success: true, count: blogs.length, blogs });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single blog by ID - MUST BE AFTER SEARCH
app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email bio profilePicture');
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update blog
app.put('/api/blogs/:id', protect, upload.any(), async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        
        const { title, description, videoLink, url } = req.body;
        if (title) blog.title = title;
        if (description) blog.description = description;
        if (videoLink || url) blog.videoLink = videoLink || url;
        
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                if (file.fieldname === 'image') {
                    if (blog.image) {
                        const oldPath = path.join(__dirname, blog.image);
                        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                    }
                    blog.image = `/uploads/${file.filename}`;
                }
                if (file.fieldname === 'video') {
                    if (blog.video) {
                        const oldPath = path.join(__dirname, blog.video);
                        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                    }
                    blog.video = `/uploads/${file.filename}`;
                }
            }
        }
        
        blog.updatedAt = Date.now();
        await blog.save();
        res.json({ success: true, message: 'Blog updated', blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete blog
app.delete('/api/blogs/:id', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        
        if (blog.image) {
            const imagePath = path.join(__dirname, blog.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
        if (blog.video) {
            const videoPath = path.join(__dirname, blog.video);
            if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
        }
        
        await blog.deleteOne();
        res.json({ success: true, message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============ USER PROFILE ROUTES ============
app.get('/api/users/profile', protect, async (req, res) => {
    res.json({ success: true, user: req.user });
});

app.put('/api/users/profile', protect, upload.single('profilePicture'), async (req, res) => {
    try {
        const { name, bio } = req.body;
        if (name) req.user.name = name;
        if (bio) req.user.bio = bio;
        
        if (req.file) {
            if (req.user.profilePicture) {
                const oldPath = path.join(__dirname, req.user.profilePicture);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            req.user.profilePicture = `/uploads/${req.file.filename}`;
        }
        
        await req.user.save();
        res.json({ success: true, user: req.user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============ DATABASE CONNECTION ============
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://assignmentUser:Assignment123@cluster0.apt53xo.mongodb.net/blog')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📍 Test: http://localhost:${PORT}/api/test`);
});