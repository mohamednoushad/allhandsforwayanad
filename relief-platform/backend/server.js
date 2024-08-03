const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const needsRoutes = require('./routes/needsRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const campRoutes = require('./routes/campRoutes');
const collectionPointRoutes = require('./routes/collectionPointRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/auth', authRoutes);
app.use('/api', needsRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', campRoutes);
app.use('/api', collectionPointRoutes);

// Serve index.html as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Serve admin.html for the admin route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

// Serve admin-login.html for the admin login route
app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin-login.html'));
});

// Serve user-login.html for the user login route
app.get('/user-login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/user-login.html'));
});

// Serve user-profile.html for the user profile route
app.get('/user-profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/user-profile.html'));
});

// Serve specific HTML files for profiles
app.get('/camp-assistant-profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/camp-assistant-profile.html'));
});

app.get('/collection-agent-profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/collection-agent-profile.html'));
});

app.get('/camp-assistant-needs', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/camp-assistant-needs.html'));
});

app.get('/collection-agent-responded-needs', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/collection-agent-responded-needs.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
