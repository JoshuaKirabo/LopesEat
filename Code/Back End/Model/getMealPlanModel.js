const pool = require('../Model/databaseManager');


const getUserData = async (userId) => 
    {
        try 
            {
                const query = 'SELECT * FROM answers_to_questions WHERE user_id = $1';  
                const result = await pool.query(query, [userId]);
                if (result.rows.length > 0) 
                    {
                        return result.rows[0];
                    } 
                else 
                    {
                        return null;
                    }
            } 
        catch (error) 
            {
                console.error('Error fetching user meal preferences:', error);
                throw error;
            }
    }

module.exports = {getUserData};



