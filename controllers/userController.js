const User = require('../models/User');
const path = require('path');
const fs = require('fs');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, bio } = req.body;
        const user = await User.findById(req.user._id);
        
        if (req.file) {
            if (user.profilePicture) {
                const oldPicPath = path.join(__dirname, '..', user.profilePicture);
                if (fs.existsSync(oldPicPath)) fs.unlinkSync(oldPicPath);
            }
            user.profilePicture = `/uploads/${req.file.filename}`;
        }
        
        user.name = name || user.name;
        user.bio = bio || user.bio;
        await user.save();
        
        res.status(200).json({ success: true, user: { id: user._id, name: user.name, email: user.email, bio: user.bio, profilePicture: user.profilePicture } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getProfile, updateProfile };