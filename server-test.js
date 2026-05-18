const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Test working!' });
});

// Blog test route
app.get('/api/blogs/test', (req, res) => {
    res.json({ message: 'Blog route working!' });
});

// POST test route
app.post('/api/blogs/create', (req, res) => {
    res.json({ message: 'POST working!', body: req.body });
});

app.listen(5000, () => {
    console.log('Test server running on port 5000');
});