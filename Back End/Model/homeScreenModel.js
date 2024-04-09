// In homeScreenModel.js
const pool = require('./databaseManager'); 

const homeScreenModel = {
  getMealCountForUser: async function(userId) 
    {
        
        const query = `SELECT meals_a_day FROM answers_to_questions WHERE user_id = $1;`;
        const { rows } = await pool.query(query, [userId]);

        if (rows.length > 0) 
            {
                return rows[0].meals_a_day; // Return the number of meals
            } 
        else 
            {
                throw new Error('User not found');
            }
    },
};

module.exports = homeScreenModel;
