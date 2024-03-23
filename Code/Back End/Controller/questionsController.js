//
//  questionsController.js
//  LopesEat
//  Back End
//  Controller
//  Created by Joshua Kirabo on 01/20/24
//

const questionsModel = require('../Model/questionsModel'); 
const cleanUpAnswers = require('./cleanUpAnswers');

// Clean up the data so that we can insert into the DB
const transformAnswers = (answers) => {
    const transformed = {};
    
    answers.forEach(({ questionNumber, answer }) => {
        const columnName = questionNumberToColumnName[questionNumber.toString()];
        
        // Handle array-type questions (e.g., dietary_restrictions)
        if ([12, 13, 14, 15].includes(questionNumber)) {
            if (Array.isArray(answer)) { // For simple arrays
                transformed[columnName] = `{${answer.join(',')}}`;
            } else if (typeof answer === 'object') { // For objects (key-value pairs)
                const selectedOptions = Object.entries(answer)
                    .filter(([_, isSelected]) => isSelected)
                    .map(([key, _]) => key);
                transformed[columnName] = `{${selectedOptions.join(',')}}`;
            }
        } else if ([29, 30].includes(questionNumber)) { // Special handling for height and weight, BMI
            // Example: split height into feet and inches, or handle BMI calculation
            // This is just an illustrative placeholder
            transformed[columnName] = answer;
        } else {
            // Direct mapping for single-value answers
            transformed[columnName] = answer;
        }
    });

    return transformed;
};



  
const questionsController = {
    submitAnswers: async function(req, res) {
        const { userId, answers } = req.body;

        try {
            console.log("Incoming answers:", answers);

            // Note: Ensure cleanUpAnswers correctly prepares the data structure for your DB.
            const transformedAnswers = await cleanUpAnswers(answers);
            console.log("Transformed answers:", transformedAnswers);

            // Now calling the model function with userId and transformedAnswers
            await questionsModel.submitAnswers(userId, transformedAnswers);

            res.json({ success: true, message: 'Answers submitted successfully' });
        } catch (error) {
            console.error('Error submitting answers:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

        getUserGender: async function(req, res) 
            {
                const userId = req.params.userId; 
            
                try 
                    {
                        const gender = await questionsModel.getUserGender(userId);
                        if (!gender) 
                            {
                                return res.status(404).json({ success: false, message: "User not found" });
                            }
                        res.json({ success: true, gender: gender });
                    } 
                catch (error) 
                    {
                        console.error('Error fetching user gender:', error);
                        res.status(500).json({ success: false, message: 'Failed to fetch user gender' });
                    }
            },
        
        getAllergies: async function(req, res) 
            {
                try 
                    {
                        const allergies = await questionsModel.getAllergies();
                        res.json({ success: true, allergies });
                    } 
                catch (error) 
                    {
                        console.error('Error getting allergies:', error);
                        res.status(500).json({ success: false, message: 'Failed to get allergies' });
                    }
            },
        
        getIntolerances: async function(req, res) 
            {
                try 
                    {
                        const intolerances = await questionsModel.getIntolerances();
                        res.json({ success: true, intolerances });
                    }
                catch (error) 
                    {
                        console.error('Error getting intolerances:', error);
                        res.status(500).json({ success: false, message: 'Failed to get intolerances' });
                    }
            },

        getMedicalConditions: async function(req, res) 
            {
                try 
                    {
                        const medicalConditions = await questionsModel.getMedicalConditions();
                        res.json({ success: true, medicalConditions });
                    }
                catch (error) 
                    {
                        console.error('Error getting medical conditions:', error);
                        res.status(500).json({ success: false, message: 'Failed to get medical conditions' });
                    }
            },
        
        getDietaryRestrictions: async function(req, res) 
            {
                try 
                    {
                        const dietaryRestrictions = await questionsModel.getDietaryRestrictions();
                        res.json({ success: true, dietaryRestrictions });
                    } 
                catch (error) 
                    {
                        console.error('Error getting dietary restrictions:', error);
                        res.status(500).json({ success: false, message: 'Failed to get dietary restrictions' });
                    }
            },
        
        checkIfUserHasCompletedQuestions: async function(req, res) 
            {
                const userId = req.params.userId; 
                
                try 
                    {
                        const hasCompleted = await questionsModel.hasUserCompletedQuestions(userId);
                        res.json({ success: true, hasCompletedQuestions: hasCompleted });
                    } 
                catch (error) 
                    {
                        console.error('Error in checkIfUserHasCompletedQuestions:', error);
                        res.status(500).json({ success: false, message: 'Failed to check if user has completed questions' });
                    }
            },
};

module.exports = questionsController;
