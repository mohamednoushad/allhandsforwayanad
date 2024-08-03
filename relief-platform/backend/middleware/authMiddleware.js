const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, 'secret_key');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};

exports.authenticateAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, 'secret_key');
        if (verified.role !== 'admin') {
            return res.status(403).send({ message: 'Forbidden' });
        }
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};
