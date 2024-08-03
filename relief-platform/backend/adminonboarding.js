const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('password', 10);
console.log(hashedPassword);



// INSERT INTO users (username, password, name, mobile_number, role, camp_id, collection_point_id)
// VALUES ('admin', '$2a$10$dJPbDG2fg1jC5Qdd2eu2KeuMDWRfudPYkQLJtgssRN/6WpVYwmxri', 'Admin Name', '1234567890', 'admin', NULL, NULL);