const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');
const { getProfile, updateProfile } = require('../controllers/userController');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, upload.single('profilePicture'), updateProfile);

module.exports = router;