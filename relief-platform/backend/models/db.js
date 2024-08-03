const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'relief_user',
  password: 'password',
  database: 'relief_platform'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

module.exports = connection;
