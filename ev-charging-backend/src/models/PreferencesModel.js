const db = require('../db');

const PreferencesModel = {
    findByUserId: (userId, callback) => {
        db.get('SELECT * FROM preferences WHERE user_id = ?', [userId], callback);
    },
    updatePreferences: (userId, renewableOnly, offPeakHours, callback) => {
        db.run(
            'INSERT OR REPLACE INTO preferences (user_id, renewable_only, off_peak_hours) VALUES (?, ?, ?)',
            [userId, renewableOnly, offPeakHours],
            callback
        );
    },
};

module.exports = PreferencesModel;
