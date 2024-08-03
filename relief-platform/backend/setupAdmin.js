const connection = require('./models/db');
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
    const adminUsername = 'admin';
    const adminPassword = 'password';

    connection.query('SELECT * FROM users WHERE username = ?', [adminUsername], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            const hashedPassword = await bcrypt.hashSync(adminPassword, 10);
            const adminUser = {
                username: adminUsername,
                password: hashedPassword,
                name: 'Admin',
                mobile_number: '1234567890',
                role: 'admin'
            };
            connection.query('INSERT INTO users SET ?', adminUser, (err, results) => {
                if (err) throw err;
                console.log('Admin user created');
            });
        } else {
            console.log('Admin user already exists');
        }
    });
};

module.exports = { createAdminUser };
