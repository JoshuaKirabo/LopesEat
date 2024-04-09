const pool = require('./databaseManager');

const profileScreenModel = {
    getUserProfile: async function(userId) {
        const userProfileResult = await pool.query('SELECT first_name, last_name, profile_picture FROM users WHERE user_id = $1', [userId]);
        if (userProfileResult.rows.length > 0) {
            return userProfileResult.rows[0]; // Return the user profile if found
        } else {
            return null; // Return null if no profile is found for the user
        }
    },

    // Add other model functions as necessary...
};

module.exports = profileScreenModel;
