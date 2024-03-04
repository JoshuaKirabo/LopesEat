//
//  questionsController.js
//  LopesEat
//  Back End
//  Controller
//  Created by Joshua Kirabo on 01/20/24
//

const questionsModel = require('../Model/questionsModel'); 

const questionsController = {
    submitAnswer: async function(req, res)
        {
            const { userId, questionId, answer } = req.body;

            try 
                {
                    await questionsModel.submitAnswer(userId, questionId, answer);

                    // Fetch the user's gender
                    const gender = await questionsModel.getUserGender(userId);
                    if(gender === undefined)
                        {
                            throw new Error('User gender not found');
                        }0

                    res.json({ success: true, message: 'Answer submitted successfully' });
                } 
            catch (error) 
                {
                    console.error('Error submitting answer:', error);
                    res.status(500).json({ success: false, message: 'Failed to submit answer' });
                }
        },

        getUserGender: async function(req, res) 
            {
                const userId = req.params.userId; // Assuming you're passing userId as a route parameter
            
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
};

module.exports = questionsController;
