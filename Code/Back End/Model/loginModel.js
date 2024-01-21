const pool = require('./databaseManager');

const loginModel = {
    isUserLoggedIn: async function(email) 
        {
            const result = await pool.query('SELECT * FROM logged_in_users WHERE email = $1', [email]);
            return result.rows.length > 0;
        },

        // Check if the user exists in the University Database
    checkUserExistence: async function(email) 
        {
            const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return userResult.rows.length > 0;
        },
    
        

    addUser: async function(student)
        {
            // Add user to the users table
            const { firstName, lastName, email, password, gender, diningDollars, dateOfBirth } = student;

            const query = 'INSERT INTO users (first_name, last_name, email, password, gender, dining_dollars, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (email) DO NOTHING';
            const values = [firstName, lastName, email, password, gender, diningDollars, dateOfBirth];
        
            await pool.query(query, values);
        },

    loginUser: async function(userId, student) 
        {
            const { firstName, lastName, email, password, gender, diningDollars, dateOfBirth } = student;
            console.log(firstName);
            console.log(email);

            const userResult = await pool.query('SELECT user_id FROM users WHERE email = $1', [email]);
            if (userResult.rows.length === 0) 
                {
                    throw new Error("User not found");
                }
        
            //const userId = userResult.rows[0].user_id;
            // Here you would add more logic to handle the login process,
            // such as verifying the user's credentials.
            // Once verified, insert or update the logged_in_users table.
            await pool.query('INSERT INTO logged_in_users (email, first_name, last_name, user_id) VALUES ($1, $2, $3, $4)', [email, firstName, lastName, userId]);
        },

    logoutUser: async function(email) 
        {
            await pool.query('DELETE FROM logged_in_users WHERE email = $1', [email]);
        }
};

module.exports = loginModel;





