// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const cors = require('cors');
// // // const cookieParser = require('cookie-parser');
// // // const dotenv = require('dotenv');
// // // const bcrypt = require('bcryptjs');
// // // const jwt = require('jsonwebtoken');

// // // dotenv.config();

// // // const app = express();

// // // // Middleware
// // // app.use(cors({ origin:'http://localhost:3000', credentials: true }));
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));  
// // // app.use(cookieParser());

// // // // MongoDB Schema
// // // const userSchema = new mongoose.Schema({
// // //     name: String,
// // //     email: { type: String, unique: true },
// // //     password: String,
// // //     createdAt: { type: Date, default: Date.now }
// // // });

// // // const blogSchema = new mongoose.Schema({
// // //     title: String,
// // //     description: String,
// // //     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// // //     authorName: String,
// // //     createdAt: { type: Date, default: Date.now }
// // // });

// // // const User = mongoose.model('User', userSchema);
// // // const Blog = mongoose.model('Blog', blogSchema);

// // // // Auth middleware
// // // const protect = async (req, res, next) => {
// // //     const token = req.cookies.token;
// // //     if (!token) {
// // //         return res.status(401).json({ error: 'Not authorized' });
// // //     }
// // //     try {
// // //         const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
// // //         req.user = await User.findById(decoded.id);
// // //         next();
// // //     } catch (err) {
// // //         res.status(401).json({ error: 'Invalid token' });
// // //     }
// // // };

// // // // Routes
// // // app.post('/api/auth/signup', async (req, res) => {
// // //     try {
// // //         const { name, email, password } = req.body;
// // //         const hashed = await bcrypt.hash(password, 10);
// // //         const user = await User.create({ name, email, password: hashed });
// // //         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');
// // //         res.cookie('token', token, { httpOnly: true });
// // //         res.json({ success: true, user: { id: user._id, name, email } });
// // //     } catch (err) {
// // //         res.status(400).json({ error: err.message });
// // //     }
// // // });
// // // app.post('/api/auth/login', async (req, res) => {
// // //     try {
// // //         const { email, password } = req.body;
        
// // //         const user = await User.findOne({ email });
// // //         if (!user) {
// // //             return res.status(401).json({ success: false, message: 'Invalid credentials' });
// // //         }
        
// // //         const isValid = await bcrypt.compare(password, user.password);
// // //         if (!isValid) {
// // //             return res.status(401).json({ success: false, message: 'Invalid credentials' });
// // //         }
        
// // //         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');
        
// // //         // Cookie set karo - automatically save hogi
// // //         res.cookie('token', token, { 
// // //             httpOnly: true, 
// // //             maxAge: 7 * 24 * 60 * 60 * 1000,
// // //             sameSite: 'lax',
// // //             path: '/'  // ← Sab routes ke liye
// // //         });
        
// // //         res.json({ 
// // //             success: true, 
// // //             user: { id: user._id, name: user.name, email: user.email } 
// // //         });
// // //     } catch (error) {
// // //         res.status(500).json({ success: false, message: error.message });
// // //     }
// // // });
// // // // app.post('/api/auth/login', async (req, res) => {
// // // //     try {
// // // //         const { email, password } = req.body;
// // // //         const user = await User.findOne({ email });
// // // //         if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        
// // // //         const valid = await bcrypt.compare(password, user.password);
// // // //         if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
        
// // // //         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');
// // // //         res.cookie('token', token, { httpOnly: true });
// // // //         res.json({ success: true, user: { id: user._id, name: user.name, email } });
// // // //     } catch (err) {
// // // //         res.status(400).json({ error: err.message });
// // // //     }
// // // // });

// // // app.post('/api/blogs/create', protect, async (req, res) => {
// // //     try {
// // //         const blog = await Blog.create({
// // //             title: req.body.title,
// // //             description: req.body.description,
// // //             author: req.user._id,
// // //             authorName: req.user.name
// // //         });
// // //         res.json({ success: true, blog });
// // //     } catch (err) {
// // //         res.status(400).json({ error: err.message });
// // //     }
// // // });

// // // app.get('/api/blogs/all', async (req, res) => {
// // //     const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author', 'name');
// // //     res.json({ success: true, blogs });
// // // });

// // // app.get('/api/test', (req, res) => {
// // //     res.json({ message: 'Server is working!' });
// // // });

// // // mongoose.connect(process.env.MONGO_URI)
// // //     .then(() => {
// // //         console.log('✅ MongoDB Connected Successfully!');
// // //         console.log('Database:', mongoose.connection.db.databaseName);
// // //     })
// // //     .catch((err) => {
// // //         console.error('❌ MongoDB Connection Error:', err.message);
// // //         process.exit(1);
// // //     });

// // //     const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //     console.log(`🚀 Server running on port ${PORT}`);
// // //     console.log(`📍 http://localhost:${PORT}`);
// // // });

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const cookieParser = require('cookie-parser');
// // const dotenv = require('dotenv');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');

// // dotenv.config();

// // const app = express();

// // // Middleware
// // app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// // // ============ MODELS ============
// // const userSchema = new mongoose.Schema({
// //     name: String,
// //     email: { type: String, unique: true },
// //     password: String,
// //     bio: { type: String, default: '' },
// //     profilePicture: { type: String, default: '' },
// //     createdAt: { type: Date, default: Date.now }
// // });

// // const blogSchema = new mongoose.Schema({
// //     title: { type: String, required: true },
// //     description: { type: String, required: true },
// //     image: { type: String, default: '' },
// //     video: { type: String, default: '' },
// //     videoLink: { type: String, default: '' },
// //     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //     authorName: { type: String, required: true },
// //     createdAt: { type: Date, default: Date.now },
// //     updatedAt: { type: Date, default: Date.now }
// // });

// // const User = mongoose.model('User', userSchema);
// // const Blog = mongoose.model('Blog', blogSchema);

// // // ============ AUTH MIDDLEWARE ============
// // const protect = async (req, res, next) => {
// //     const token = req.cookies.token;
// //     if (!token) {
// //         return res.status(401).json({ success: false, message: 'Not authorized, please login' });
// //     }
// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
// //         req.user = await User.findById(decoded.id).select('-password');
// //         if (!req.user) {
// //             return res.status(401).json({ success: false, message: 'User not found' });
// //         }
// //         next();
// //     } catch (error) {
// //         res.status(401).json({ success: false, message: 'Invalid token' });
// //     }
// // };

// // // ============ AUTH ROUTES ============
// // app.get('/api/test', (req, res) => {
// //     res.json({ success: true, message: 'Server is running! 🚀' });
// // });

// // app.post('/api/auth/signup', async (req, res) => {
// //     try {
// //         const { name, email, password } = req.body;
        
// //         const existingUser = await User.findOne({ email });
// //         if (existingUser) {
// //             return res.status(400).json({ success: false, message: 'User already exists' });
// //         }
        
// //         const hashedPassword = await bcrypt.hash(password, 10);
// //         const user = await User.create({ name, email, password: hashedPassword });
// //         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');
        
// //         res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
// //         res.status(201).json({ 
// //             success: true, 
// //             user: { id: user._id, name: user.name, email: user.email } 
// //         });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });

// // app.post('/api/auth/login', async (req, res) => {
// //     try {
// //         const { email, password } = req.body;
        
// //         const user = await User.findOne({ email });
// //         if (!user) {
// //             return res.status(401).json({ success: false, message: 'Invalid credentials' });
// //         }
        
// //         const isValid = await bcrypt.compare(password, user.password);
// //         if (!isValid) {
// //             return res.status(401).json({ success: false, message: 'Invalid credentials' });
// //         }
        
// //         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');
// //         res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        
// //         res.json({ 
// //             success: true, 
// //             user: { id: user._id, name: user.name, email: user.email } 
// //         });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });

// // app.get('/api/auth/logout', (req, res) => {
// //     res.cookie('token', '', { maxAge: 0 });
// //     res.json({ success: true, message: 'Logged out successfully' });
// // });

// // // ============ BLOG ROUTES ============

// // // Create blog
// // // Create blog with form-data (image/video upload support)
// // app.post('/api/blogs/create', protect, upload.fields([
// //     { name: 'image', maxCount: 1 },
// //     { name: 'video', maxCount: 1 }
// // ]), async (req, res) => {
// //     try {
// //         const { title, description, url } = req.body;
        
// //         if (!title || !description) {
// //             return res.status(400).json({ success: false, message: 'Title and description required' });
// //         }
        
// //         let imagePath = '';
// //         let videoPath = '';
        
// //         if (req.files && req.files.image) {
// //             imagePath = `/uploads/${req.files.image[0].filename}`;
// //         }
// //         if (req.files && req.files.video) {
// //             videoPath = `/uploads/${req.files.video[0].filename}`;
// //         }
        
// //         const blog = await Blog.create({
// //             title,
// //             description,
// //             image: imagePath,
// //             video: videoPath,
// //             videoLink: url || '',
// //             author: req.user._id,
// //             authorName: req.user.name
// //         });
        
// //         res.status(201).json({ success: true, blog });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });
// // // app.post('/api/blogs/create', protect, async (req, res) => {
// // //     try {
// // //         const { title, description, videoLink } = req.body;
        
// // //         if (!title || !description) {
// // //             return res.status(400).json({ success: false, message: 'Title and description required' });
// // //         }
        
// // //         const blog = await Blog.create({
// // //             title,
// // //             description,
// // //             videoLink: videoLink || '',
// // //             author: req.user._id,
// // //             authorName: req.user.name
// // //         });
        
// // //         res.status(201).json({ success: true, blog });
// // //     } catch (error) {
// // //         res.status(500).json({ success: false, message: error.message });
// // //     }
// // // });

// // // Get all blogs
// // app.get('/api/blogs/all', async (req, res) => {
// //     try {
// //         const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author', 'name email profilePicture');
// //         res.json({ success: true, blogs });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });

// // // Get my blogs (logged in user ke blogs)
// // app.get('/api/blogs/my-blogs', protect, async (req, res) => {
// //     try {
// //         const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });
// //         res.json({ success: true, blogs });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });

// // // Get single blog by ID
// // app.get('/api/blogs/:id', async (req, res) => {
// //     try {
// //         const blog = await Blog.findById(req.params.id).populate('author', 'name email bio profilePicture');
// //         if (!blog) {
// //             return res.status(404).json({ success: false, message: 'Blog not found' });
// //         }
// //         res.json({ success: true, blog });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });

// // // Update blog
// // app.put('/api/blogs/:id', protect, async (req, res) => {
// //     try {
// //         const blog = await Blog.findById(req.params.id);
// //         if (!blog) {
// //             return res.status(404).json({ success: false, message: 'Blog not found' });
// //         }
        
// //         // Check if user is the author
// //         if (blog.author.toString() !== req.user._id.toString()) {
// //             return res.status(403).json({ success: false, message: 'Not authorized to update this blog' });
// //         }
        
// //         const { title, description, videoLink } = req.body;
// //         if (title) blog.title = title;
// //         if (description) blog.description = description;
// //         if (videoLink) blog.videoLink = videoLink;
// //         blog.updatedAt = Date.now();
        
// //         await blog.save();
// //         res.json({ success: true, message: 'Blog updated successfully', blog });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });

// // // Delete blog
// // app.delete('/api/blogs/:id', protect, async (req, res) => {
// //     try {
// //         const blog = await Blog.findById(req.params.id);
// //         if (!blog) {
// //             return res.status(404).json({ success: false, message: 'Blog not found' });
// //         }
        
// //         // Check if user is the author
// //         if (blog.author.toString() !== req.user._id.toString()) {
// //             return res.status(403).json({ success: false, message: 'Not authorized to delete this blog' });
// //         }
        
// //         await blog.deleteOne();
// //         res.json({ success: true, message: 'Blog deleted successfully' });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });

// // // Search blogs
// // app.get('/api/blogs/search', async (req, res) => {
// //     try {
// //         const { keyword } = req.query;
// //         if (!keyword) {
// //             return res.status(400).json({ success: false, message: 'Keyword required' });
// //         }
        
// //         const blogs = await Blog.find({
// //             $or: [
// //                 { title: { $regex: keyword, $options: 'i' } },
// //                 { description: { $regex: keyword, $options: 'i' } }
// //             ]
// //         }).populate('author', 'name email profilePicture');
        
// //         res.json({ success: true, blogs });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });

// // // ============ USER PROFILE ROUTES ============

// // // Get profile
// // app.get('/api/users/profile', protect, async (req, res) => {
// //     res.json({ success: true, user: req.user });
// // });

// // // Update profile
// // app.put('/api/users/profile', protect, async (req, res) => {
// //     try {
// //         const { name, bio } = req.body;
// //         if (name) req.user.name = name;
// //         if (bio) req.user.bio = bio;
// //         await req.user.save();
// //         res.json({ success: true, user: req.user });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // });

// // // ============ DATABASE CONNECTION ============
// // mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://assignmentUser:Assignment123@cluster0.apt53xo.mongodb.net/blog')
// //     .then(() => console.log('✅ MongoDB Connected'))
// //     .catch(err => console.log('❌ MongoDB Error:', err.message));

// // // ============ START SERVER ============
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //     console.log(`🚀 Server running on http://localhost:${PORT}`);
// //     console.log(`📍 Test: http://localhost:${PORT}/api/test`);
// // });


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Serve static files from uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ============ MULTER SETUP FOR FILE UPLOAD ============
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
//     fileFilter: (req, file, cb) => {
//         const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi|mkv/;
//         const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = allowedTypes.test(file.mimetype);
//         if (extname && mimetype) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only images and videos are allowed!'));
//         }
//     }
// });

// // ============ MODELS ============
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     bio: { type: String, default: '' },
//     profilePicture: { type: String, default: '' },
//     createdAt: { type: Date, default: Date.now }
// });

// const blogSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     image: { type: String, default: '' },
//     video: { type: String, default: '' },
//     videoLink: { type: String, default: '' },
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     authorName: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// const User = mongoose.model('User', userSchema);
// const Blog = mongoose.model('Blog', blogSchema);

// // ============ AUTH MIDDLEWARE ============
// const protect = async (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(401).json({ success: false, message: 'Not authorized, please login' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
//         req.user = await User.findById(decoded.id).select('-password');
//         if (!req.user) {
//             return res.status(401).json({ success: false, message: 'User not found' });
//         }
//         next();
//     } catch (error) {
//         res.status(401).json({ success: false, message: 'Invalid token' });
//     }
// };

// // ============ AUTH ROUTES ============
// app.get('/api/test', (req, res) => {
//     res.json({ success: true, message: 'Server is running! 🚀' });
// });

// app.post('/api/auth/signup', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
        
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: 'User already exists' });
//         }
        
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({ name, email, password: hashedPassword });
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');
        
//         res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
//         res.status(201).json({ 
//             success: true, 
//             user: { id: user._id, name: user.name, email: user.email } 
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// app.post('/api/auth/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }
        
//         const isValid = await bcrypt.compare(password, user.password);
//         if (!isValid) {
//             return res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }
        
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123');
//         res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        
//         res.json({ 
//             success: true, 
//             user: { id: user._id, name: user.name, email: user.email } 
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// app.get('/api/auth/logout', (req, res) => {
//     res.cookie('token', '', { maxAge: 0 });
//     res.json({ success: true, message: 'Logged out successfully' });
// });

// // ============ BLOG ROUTES ============

// // Create blog with file upload (image/video)
// app.post('/api/blogs/create', protect, upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'video', maxCount: 1 }
// ]), async (req, res) => {
//     try {
//         const { title, description, url } = req.body;
        
//         if (!title || !description) {
//             return res.status(400).json({ success: false, message: 'Title and description required' });
//         }
        
//         let imagePath = '';
//         let videoPath = '';
        
//         if (req.files && req.files.image) {
//             imagePath = `/uploads/${req.files.image[0].filename}`;
//         }
//         if (req.files && req.files.video) {
//             videoPath = `/uploads/${req.files.video[0].filename}`;
//         }
        
//         const blog = await Blog.create({
//             title,
//             description,
//             image: imagePath,
//             video: videoPath,
//             videoLink: url || '',
//             author: req.user._id,
//             authorName: req.user.name
//         });
        
//         res.status(201).json({ success: true, blog });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Get all blogs
// app.get('/api/blogs/all', async (req, res) => {
//     try {
//         const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author', 'name email profilePicture');
//         res.json({ success: true, blogs });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Get my blogs (logged in user ke blogs)
// app.get('/api/blogs/my-blogs', protect, async (req, res) => {
//     try {
//         const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });
//         res.json({ success: true, blogs });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Get single blog by ID
// app.get('/api/blogs/:id', async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id).populate('author', 'name email bio profilePicture');
//         if (!blog) {
//             return res.status(404).json({ success: false, message: 'Blog not found' });
//         }
//         res.json({ success: true, blog });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Update blog with file upload
// app.put('/api/blogs/:id', protect, upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'video', maxCount: 1 }
// ]), async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id);
//         if (!blog) {
//             return res.status(404).json({ success: false, message: 'Blog not found' });
//         }
        
//         if (blog.author.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ success: false, message: 'Not authorized to update this blog' });
//         }
        
//         const { title, description, url } = req.body;
//         if (title) blog.title = title;
//         if (description) blog.description = description;
//         if (url) blog.videoLink = url;
        
//         if (req.files && req.files.image) {
//             if (blog.image) {
//                 const oldImagePath = path.join(__dirname, blog.image);
//                 if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
//             }
//             blog.image = `/uploads/${req.files.image[0].filename}`;
//         }
//         if (req.files && req.files.video) {
//             if (blog.video) {
//                 const oldVideoPath = path.join(__dirname, blog.video);
//                 if (fs.existsSync(oldVideoPath)) fs.unlinkSync(oldVideoPath);
//             }
//             blog.video = `/uploads/${req.files.video[0].filename}`;
//         }
        
//         blog.updatedAt = Date.now();
//         await blog.save();
//         res.json({ success: true, message: 'Blog updated successfully', blog });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Delete blog
// app.delete('/api/blogs/:id', protect, async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id);
//         if (!blog) {
//             return res.status(404).json({ success: false, message: 'Blog not found' });
//         }
        
//         if (blog.author.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ success: false, message: 'Not authorized to delete this blog' });
//         }
        
//         // Delete associated files
//         if (blog.image) {
//             const imagePath = path.join(__dirname, blog.image);
//             if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//         }
//         if (blog.video) {
//             const videoPath = path.join(__dirname, blog.video);
//             if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
//         }
        
//         await blog.deleteOne();
//         res.json({ success: true, message: 'Blog deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Search blogs
// app.get('/api/blogs/search', async (req, res) => {
//     try {
//         const { keyword } = req.query;
//         if (!keyword) {
//             return res.status(400).json({ success: false, message: 'Keyword required' });
//         }
        
//         const blogs = await Blog.find({
//             $or: [
//                 { title: { $regex: keyword, $options: 'i' } },
//                 { description: { $regex: keyword, $options: 'i' } }
//             ]
//         }).populate('author', 'name email profilePicture');
        
//         res.json({ success: true, blogs });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // ============ USER PROFILE ROUTES ============

// // Get profile
// app.get('/api/users/profile', protect, async (req, res) => {
//     res.json({ success: true, user: req.user });
// });

// // Update profile with picture
// app.put('/api/users/profile', protect, upload.single('profilePicture'), async (req, res) => {
//     try {
//         const { name, bio } = req.body;
//         if (name) req.user.name = name;
//         if (bio) req.user.bio = bio;
        
//         if (req.file) {
//             if (req.user.profilePicture) {
//                 const oldPicPath = path.join(__dirname, req.user.profilePicture);
//                 if (fs.existsSync(oldPicPath)) fs.unlinkSync(oldPicPath);
//             }
//             req.user.profilePicture = `/uploads/${req.file.filename}`;
//         }
        
//         await req.user.save();
//         res.json({ success: true, user: req.user });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // ============ DATABASE CONNECTION ============
// mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://assignmentUser:Assignment123@cluster0.apt53xo.mongodb.net/blog')
//     .then(() => console.log('✅ MongoDB Connected'))
//     .catch(err => console.log('❌ MongoDB Error:', err.message));

// // ============ START SERVER ============
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//     console.log(`📍 Test: http://localhost:${PORT}/api/test`);
// });

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

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
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
        
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
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
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        
        res.json({ 
            success: true, 
            user: { id: user._id, name: user.name, email: user.email } 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/auth/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0 });
    res.json({ success: true, message: 'Logged out successfully' });
});

// ============ BLOG ROUTES ============
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
// // Create blog - FORM-DATA WITH FILE UPLOAD
// app.post('/api/blogs/create', protect, upload.any(), async (req, res) => {
//     try {
//         console.log('=== CREATE BLOG REQUEST ===');
//         console.log('Body:', req.body);
//         console.log('Files:', req.files ? req.files.map(f => ({ fieldname: f.fieldname, filename: f.filename })) : 'No files');
        
//         const title = req.body.title;
//         const description = req.body.description;
//         const videoLink = req.body.videoLink || req.body.url || '';
        
//         if (!title || !description) {
//             return res.status(400).json({ success: false, message: 'Title and description required' });
//         }
        
//         let imagePath = '';
//         let videoPath = '';
        
//         if (req.files && req.files.length > 0) {
//             for (const file of req.files) {
//                 if (file.fieldname === 'image' || file.fieldname === 'Image') {
//                     imagePath = `/uploads/${file.filename}`;
//                 }
//                 if (file.fieldname === 'video' || file.fieldname === 'Video') {
//                     videoPath = `/uploads/${file.filename}`;
//                 }
//             }
//         }
        
//         const blog = await Blog.create({
//             title,
//             description,
//             image: imagePath,
//             video: videoPath,
//             videoLink: videoLink,
//             author: req.user._id,
//             authorName: req.user.name
//         });
        
//         res.status(201).json({ success: true, blog });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Get all blogs
// app.get('/api/blogs/all', async (req, res) => {
//     try {
//         const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author', 'name email profilePicture');
//         res.json({ success: true, blogs });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Get my blogs
// app.get('/api/blogs/my-blogs', protect, async (req, res) => {
//     try {
//         const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });
//         res.json({ success: true, blogs });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Get single blog
// app.get('/api/blogs/:id', async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id).populate('author', 'name email bio profilePicture');
//         if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
//         res.json({ success: true, blog });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Update blog
// app.put('/api/blogs/:id', protect, upload.any(), async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id);
//         if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
//         if (blog.author.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ success: false, message: 'Not authorized' });
//         }
        
//         const { title, description, videoLink, url } = req.body;
//         if (title) blog.title = title;
//         if (description) blog.description = description;
//         if (videoLink || url) blog.videoLink = videoLink || url;
        
//         if (req.files && req.files.length > 0) {
//             for (const file of req.files) {
//                 if (file.fieldname === 'image') {
//                     if (blog.image) {
//                         const oldPath = path.join(__dirname, blog.image);
//                         if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//                     }
//                     blog.image = `/uploads/${file.filename}`;
//                 }
//                 if (file.fieldname === 'video') {
//                     if (blog.video) {
//                         const oldPath = path.join(__dirname, blog.video);
//                         if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//                     }
//                     blog.video = `/uploads/${file.filename}`;
//                 }
//             }
//         }
        
//         blog.updatedAt = Date.now();
//         await blog.save();
//         res.json({ success: true, message: 'Blog updated', blog });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Delete blog
// app.delete('/api/blogs/:id', protect, async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id);
//         if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
//         if (blog.author.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ success: false, message: 'Not authorized' });
//         }
        
//         if (blog.image) {
//             const imagePath = path.join(__dirname, blog.image);
//             if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//         }
//         if (blog.video) {
//             const videoPath = path.join(__dirname, blog.video);
//             if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
//         }
        
//         await blog.deleteOne();
//         res.json({ success: true, message: 'Blog deleted' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Search blogs
// app.get('/api/blogs/search', async (req, res) => {
//     try {
//         const { keyword } = req.query;
//         if (!keyword) return res.status(400).json({ success: false, message: 'Keyword required' });
        
//         const blogs = await Blog.find({
//             $or: [
//                 { title: { $regex: keyword, $options: 'i' } },
//                 { description: { $regex: keyword, $options: 'i' } }
//             ]
//         }).populate('author', 'name email');
        
//         res.json({ success: true, blogs });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

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