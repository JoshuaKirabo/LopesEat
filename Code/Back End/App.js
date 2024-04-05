//
//  App.js
//  LopesEat
//  Back End
//  Created by Joshua Kirabo on 01/20/24
//

const express = require('express');
const loginController = require('./Controller/loginController');
const questionsController = require('./Controller/questionsController');
const homeScreenController = require('./Controller/homeScreenController');
const profileScreenController = require('./Controller/profileScreenController');
const chatController = require('./Controller/chatController');

const cors = require('cors');
const app = express();
const port = 3000;
const pool = require('./Model/databaseManager'); // Importing from the 'model' subdirectory



app.use(express.json());
app.use(cors()); 

// Handle the login and logout routing


// ---------------------- Login Content ---------------------------//
app.post('/login', loginController.handleLogin);
app.post('/logout', loginController.handleLogout);
app.post('/removeUserFromLoggedIn', loginController.removeUserFromLoggedIn);
app.post('/submitAnswers', questionsController.submitAnswers);

app.get('/getUserGender/:userId', questionsController.getUserGender);
app.get('/checkLoggedIn', loginController.checkLoggedIn);
app.get('/checkIfUserHasCompletedQuestions/:userId', questionsController.checkIfUserHasCompletedQuestions);
// ------------------ End of Login Content ------------------------//


// ---------------------- Home screen Content ---------------------------//
app.get('/meals-count/:userId', homeScreenController.getMealCount);
// ------------------ End of Home screen Content ------------------------//

// ---------------------- Profile screen Content ---------------------------//
app.get('/profile/:userId', profileScreenController.fetchUserProfile);
// ------------------ End of Profile screen Content ------------------------//

// ---------------------- Chat screen Content ---------------------------//
app.post('/sendMessage', chatController.sendMessage);
// ------------------ End of Chat screen Content ------------------------//

// Add other middleware and routes as needed
app.listen(port, () => {console.log(`Server running on http://localhost:${port}`);});

