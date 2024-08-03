const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../models/db');

exports.registerUser = (req, res) => {
    const { username, password, name, mobile_number, role, camp_id, collection_point_id } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    console.log("registering user",req.body)
    console.log("hashedpassword")

    const query = 'INSERT INTO users (username, password, name, mobile_number, role, camp_id, collection_point_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [username, hashedPassword, name, mobile_number, role, camp_id, collection_point_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('User registered successfully');
    });
};

exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).send({ message: 'User not found' });

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).send({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id, role: user.role, camp_id: user.camp_id, collection_point_id: user.collection_point_id }, 'secret_key', { expiresIn: '1h' });
        res.json({ token, role: user.role });
    });
};


exports.getProfile = (req, res) => {
    const userId = req.user.id;
    const query = `
        SELECT u.id, u.username, u.name, u.mobile_number, u.role, 
               c.id as camp_id, c.name as camp_name, c.address as camp_address, c.district as camp_district, c.state as camp_state, c.latitude as camp_latitude, c.longitude as camp_longitude,
               cp.id as collection_point_id, cp.name as collection_point_name, cp.address as collection_point_address, cp.district as collection_point_district, cp.state as collection_point_state, cp.latitude as collection_point_latitude, cp.longitude as collection_point_longitude
        FROM users u
        LEFT JOIN camps c ON u.camp_id = c.id
        LEFT JOIN collection_points cp ON u.collection_point_id = cp.id
        WHERE u.id = ?
    `;
    connection.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send({ message: 'User not found' });

        const user = results[0];
        res.json({
            id: user.id,
            username: user.username,
            name: user.name,
            mobile_number: user.mobile_number,
            role: user.role,
            location: user.role === 'camp_assistant' ? {
                id: user.camp_id,
                name: user.camp_name,
                address: user.camp_address,
                district: user.camp_district,
                state: user.camp_state,
                latitude: user.camp_latitude,
                longitude: user.camp_longitude
            } : {
                id: user.collection_point_id,
                name: user.collection_point_name,
                address: user.collection_point_address,
                district: user.collection_point_district,
                state: user.collection_point_state,
                latitude: user.collection_point_latitude,
                longitude: user.collection_point_longitude
            }
        });
    });
};
