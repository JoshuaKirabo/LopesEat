const pool = require('./databaseManager.JS'); 

const questionsModel = {
    submitAnswer: async function(userId, questionId, answer) 
        {
            try 
                {
                    const query = `
                        INSERT INTO answers_to_questions (user_id, question_id, answer) 
                        VALUES ($1, $2, $3)
                        ON CONFLICT (user_id, question_id) 
                        DO UPDATE SET answer = EXCLUDED.answer;
                    `;
                    await pool.query(query, [userId, questionId, answer]);
                } 
            catch (error) 
                {
                    throw error;
                }
        },
    
    // Since we will base on the gender to determine which questions to ask, we will get the user's gender
    getUserGender: async function(userId)
        {
            try 
                {
                    const query = `SELECT gender FROM users WHERE user_id = $1;`;
                    const result = await pool.query(query, [userId]);
                    if (result.rows.length > 0)
                        {
                            return result.rows[0].gender; 
                        } 
                    else 
                        {
                            throw new Error('User not found');
                        }
                } 
            catch (error) 
            {
                console.error('Error fetching user gender:', error);
                throw error;
            }
        },
    
        getAllergies: async function()
            {
                try 
                    {
                        const query = `SELECT * FROM allergens;`;
                        const result = await pool.query(query);
                        return result.rows;
                    }
                 catch (error)
                    {
                        console.error('Error fetching allergies:', error);
                        throw error;
                    }
            },

            getIntolerances: async function()
                {
                    try 
                        {
                            const query = `SELECT * FROM intolerances;`;
                            const result = await pool.query(query);
                            return result.rows;
                        } 
                    catch (error) 
                        {
                            console.error('Error fetching intolerances:', error);
                            throw error;
                        }
                },

            getMedicalConditions: async function() 
                {
                    try
                        {
                            const query = `SELECT * FROM medical_conditions;`;
                            const result = await pool.query(query);
                            return result.rows;
                        } 
                    catch (error)
                        {
                            console.error('Error fetching medical conditions:', error);
                            throw error;
                        }
                },

            getDietaryRestrictions: async function() 
                {
                    try 
                        {
                            const query = `SELECT * FROM dietary_restrictions;`; // Assuming your table name is dietary_restrictions
                            const result = await pool.query(query);
                            return result.rows;
                        } 
                    catch (error)
                        {
                            console.error('Error fetching dietary restrictions:', error);
                            throw error;
                        }
                },
};

module.exports = questionsModel;
