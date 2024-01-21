const loginModel = require('./../Model/loginModel');
const UniversityCredsAPI = require('../Model/UniversityCredsAPI');
const universityCredsAPI = new UniversityCredsAPI('universityDB.txt'); 
const pool = require('../Model/databaseManager'); // Importing from the 'model' subdirectory

const loginController = {
    handleSignup: async function(req, res) 
        {
            const { email } = req.body;

            try 
                {
                    // Check if the student is registered in the university
                    const isStudentRegistered = universityCredsAPI.isStudentRegistered(email);
                    if (!isStudentRegistered) 
                        {
                            return res.json({ success: false, message: "You are not a registered student." });
                        }
                } 
            catch (error) 
                {
                    console.error("Cannot sign up", error.message);
                    console.log(error.stack);
                    return res.status(500).json({ success: false, message: "An error occurred ll" });
                }
        },
    
        checkLoggedIn: async function(req, res) 
        {
            try {
                const { userId } = req.query;
                const queryResult = await pool.query('SELECT * FROM logged_in_users WHERE user_id = $1', [userId]);
                
                if (queryResult.rows.length > 0) {
                    res.json({ isLoggedIn: true });
                } else {
                    res.json({ isLoggedIn: false });
                }
            } catch (error) {
                console.error('Error checking logged-in status:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        },

        handleLogin: async function(req, res) {
            const { email, password } = req.body;
            console.log('Login attempt:', { email, password });
        
            try {
                // Verify credentials against universityDB.txt
                const student = universityCredsAPI.getStudentByEmailAndPassword(email, password);
                if (!student) {
                    return res.json({ success: false, message: "Invalid Credentials or not a registered student." });
                }
        
                // Check if user already exists in the users table
                let userId;
                const userResult = await pool.query('SELECT user_id FROM users WHERE email = $1', [email]);
        
                if (userResult.rows.length > 0) {
                    // Existing user
                    userId = userResult.rows[0].user_id;
                } else {
                    // New user, add them to the users table
                    const newUserResult = await pool.query(
                        'INSERT INTO users (email, first_name, last_name, password, gender) VALUES ($1, $2, $3, $4, $5) RETURNING user_id',
                        [student.email, student.firstName, student.lastName, student.password, student.gender]
                    );
                    userId = newUserResult.rows[0].user_id;
                }
                
                // Log the user in by adding/updating their entry in the logged_in_users table
                await loginModel.loginUser(userId, student);
        
                return res.json({ success: true, message: "Success, Logged in", redirectTo: "HomePage", userId: userId });
            } catch (error) {
                console.error("Login error", error.message);
                return res.status(500).json({ success: false, message: "An error occurred during login" });
            }
        },


    handleLogout: async function(req, res) 
        {
            const { userId } = req.body; // or use req.params.userId based on your setup

            try {
                // Remove the user from the logged_in_users table
                // Assuming you are using a SQL database and have a function to run queries
                await pool.query('DELETE FROM logged_in_users WHERE user_id = $1', [userId]);
                
                res.json({ success: true, message: 'Logout successful' });
            } catch (error) {
                console.error('Logout error:', error);
                res.status(500).json({ success: false, message: 'An error occurred during logout' });
            }
        }
};

module.exports = loginController;




