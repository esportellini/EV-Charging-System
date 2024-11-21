const db = require('../db');

const UserModel = {
    findByUsername: (username, callback) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], callback);
    },
    createUser: (username, password, callback) => {
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], callback);
    },
};

module.exports = UserModel;
