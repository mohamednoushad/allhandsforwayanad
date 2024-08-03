const connection = require('../models/db');

exports.addInventory = (req, res) => {
    const { collection_point_id, item, quantity } = req.body;
    const query = 'INSERT INTO inventory (collection_point_id, item, quantity) VALUES (?, ?, ?)';
    connection.query(query, [collection_point_id, item, quantity], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Inventory added successfully');
    });
};

exports.getInventory = (req, res) => {
    const query = 'SELECT * FROM inventory';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.updateInventory = (req, res) => {
    const { id } = req.params;
    const { item, quantity } = req.body;
    const query = 'UPDATE inventory SET item = ?, quantity = ? WHERE id = ?';
    connection.query(query, [item, quantity, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Inventory updated successfully');
    });
};

exports.deleteInventory = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM inventory WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Inventory deleted successfully');
    });
};
