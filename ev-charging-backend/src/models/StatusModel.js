const db = require('../db');

const StatusModel = {
    findByUserId: (userId, callback) => {
        db.get('SELECT * FROM status WHERE user_id = ?', [userId], callback);
    },
    createStatus: (userId, status, energySource, timeRemaining, callback) => {
        db.run(
            'INSERT INTO status (user_id, status, energySource, timeRemaining) VALUES (?, ?, ?, ?)',
            [userId, status, energySource, timeRemaining],
            callback
        );
    },
};

module.exports = StatusModel;
