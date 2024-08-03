const connection = require('../models/db');


exports.createNeed = (req, res) => {
    const { camp_id, item, quantity } = req.body;
    const query = 'INSERT INTO needs (camp_id, item, quantity, status) VALUES (?, ?, ?, "new")';
    connection.query(query, [camp_id, item, quantity], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Need created successfully');
    });
};

exports.getNeedsForCamp = (req, res) => {
    const userId = req.user.id;
    const query = `
        SELECT n.*, 
               c.name as camp_name, c.district as camp_district, c.state as camp_state, c.latitude as camp_latitude, c.longitude as camp_longitude,
               cp.name as collection_point_name, cp.district as collection_point_district, cp.state as collection_point_state, cp.latitude as collection_point_latitude, cp.longitude as collection_point_longitude,
               pu.name as public_user_name
        FROM needs n
        LEFT JOIN camps c ON n.camp_id = c.id
        LEFT JOIN collection_points cp ON n.collection_point_id = cp.id
        LEFT JOIN public_users pu ON n.public_user_id = pu.id
        WHERE n.camp_id IN (SELECT camp_id FROM users WHERE id = ?)
    `;
    connection.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.getUnfulfilledNeeds = (req, res) => {
    const query = `
        SELECT n.*, 
               c.name as camp_name, c.district as camp_district, c.state as camp_state, c.latitude as camp_latitude, c.longitude as camp_longitude
        FROM needs n
        LEFT JOIN camps c ON n.camp_id = c.id
        WHERE n.status = "new"
    `;
    connection.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.respondToNeed = (req, res) => {
    const { collection_point_id } = req.body;
    const needId = req.params.needId;
    const query = 'UPDATE needs SET collection_point_id = ?, status = "responded" WHERE id = ?';
    connection.query(query, [collection_point_id, needId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Need responded to successfully');
    });
};

exports.forwardNeedToPublic = (req, res) => {
    const needId = req.params.needId;
    const query = 'UPDATE needs SET status = "public" WHERE id = ?';
    connection.query(query, [needId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Need forwarded to public successfully');
    });
};

exports.getRespondedNeeds = (req, res) => {
    const userId = req.user.id;
    const query = `
        SELECT n.*, 
               c.name as camp_name, c.district as camp_district, c.state as camp_state, c.latitude as camp_latitude, c.longitude as camp_longitude
        FROM needs n
        LEFT JOIN camps c ON n.camp_id = c.id
        WHERE n.collection_point_id IN (SELECT collection_point_id FROM users WHERE id = ?)
    `;
    connection.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};


exports.getNeedsForPublic = (req, res) => {
    const query = 'SELECT * FROM needs WHERE status = "forwarded_to_public"';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.addPublicUser = (req, res) => {
    const { name, mobile_number, details } = req.body;
    const query = 'INSERT INTO public_users (name, mobile_number, details) VALUES (?, ?, ?)';
    connection.query(query, [name, mobile_number, details], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: results.insertId });
    });
};
