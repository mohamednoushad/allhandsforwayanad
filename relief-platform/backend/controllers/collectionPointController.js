const connection = require('../models/db');

exports.createCollectionPoint = (req, res) => {
  const { name, address, district, state, latitude, longitude } = req.body;
  const query = 'INSERT INTO collection_points (name, address, district, state, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [name, address, district, state, latitude, longitude], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Collection Point created successfully');
  });
};

exports.getCollectionPoints = (req, res) => {
  const query = 'SELECT * FROM collection_points';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};
