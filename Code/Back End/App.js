//
//  App.js
//  LopesEat
//  Back End
//  Created by Joshua Kirabo on 01/20/24
//

const express = require('express');
const loginController = require('./Controller/loginController');
const questionsController = require('./Controller/questionsController.js');

const cors = require('cors');
const app = express();
const port = 3000;
const pool = require('./Model/databaseManager'); // Importing from the 'model' subdirectory



app.use(express.json());
app.use(cors()); 

// Handle the login and logout routing
app.post('/login', loginController.handleLogin);

app.get('/checkLoggedIn', loginController.checkLoggedIn);

app.post('/logout', loginController.handleLogout);

app.post('/removeUserFromLoggedIn', loginController.removeUserFromLoggedIn);

app.post('/submitAnswers', questionsController.submitAnswers);

app.get('/getUserGender/:userId', questionsController.getUserGender);

app.get('/getAllergies', questionsController.getAllergies);
app.get('/checkIfUserHasCompletedQuestions', questionsController.checkIfUserHasCompletedQuestions);
app.get('/getIntolerances', questionsController.getIntolerances);
app.get('/getMedicalConditions', questionsController.getMedicalConditions);
app.get('/getDietaryRestrictions', questionsController.getDietaryRestrictions);


/* Create a route to check the database connection
/ For Debugging purposes
app.get('/checkdb', async (req, res) => {
    try 
    {
      // Attempt to connect to the database
      const client = await pool.connect();
      client.release(); // Release the client back to the pool
  
      res.status(200).json({ message: 'Connected to the database successfully' });
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.status(500).json({ message: 'Failed to connect to the database' });
    }
  });*/

// Add other middleware and routes as needed
app.listen(port, () => {console.log(`Server running on http://localhost:${port}`);});

