const connection = require('../models/db');

exports.createCamp = (req, res) => {
    const { name, address, district, state, latitude, longitude } = req.body;
    const query = 'INSERT INTO camps (name, address, district, state, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [name, address, district, state, latitude, longitude], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Camp created successfully');
    });
};

exports.getCamps = (req, res) => {
    const query = 'SELECT * FROM camps';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        console.log("camps called",results)
        res.json(results);
    });
};
