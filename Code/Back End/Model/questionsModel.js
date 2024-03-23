const pool = require('./databaseManager.JS'); 

const questionsModel = {
    submitAnswers: async function(userId, transformedAnswers) {
        try {
            await pool.query('BEGIN');
            
            const query = `
            INSERT INTO answers_to_questions (user_id, 
                                              dieting_goal, 
                                              physical_build, 
                                              goal_build, 
                                              fitness_experience, 
                                              time_since_last_ideal_weight, 
                                              daily_schedule, 
                                              exercise_frequency, 
                                              after_taking_a_flight_of_stairs, 
                                              walk_frequency, 
                                              back_or_knees, 
                                              stomach_discomfort, 
                                              dietary_restrictions, 
                                              allergies, 
                                              medical_conditions, 
                                              foods_excluded, 
                                              meat_excluded, 
                                              sugary_foods_frequency, 
                                              energy_maintenance, 
                                              sleep_per_night, 
                                              daily_water_intake_ounces, 
                                              daily_water_intake_cups,
                                              multitask, 
                                              people_around, 
                                              returning_old_habits, 
                                              unhealthy_choice, 
                                              external_motivation, 
                                              daily_caffeine_intake, 
                                              excluded_restaurants, 
                                              meals_a_day, 
                                              height_in_cm, 
                                              height_feet, 
                                              height_inches, 
                                              bmi, 
                                              bmi_status,
                                              weight_in_lbs, 
                                              goal_weight)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37)
            ON CONFLICT (user_id)
            DO UPDATE SET 
                dieting_goal = EXCLUDED.dieting_goal, 
                physical_build = EXCLUDED.physical_build, 
                goal_build = EXCLUDED.goal_build, 
                fitness_experience = EXCLUDED.fitness_experience, 
                time_since_last_ideal_weight = EXCLUDED.time_since_last_ideal_weight,
                daily_schedule = EXCLUDED.daily_schedule, 
                exercise_frequency = EXCLUDED.exercise_frequency, 
                after_taking_a_flight_of_stairs = EXCLUDED.after_taking_a_flight_of_stairs, 
                walk_frequency = EXCLUDED.walk_frequency, 
                back_or_knees = EXCLUDED.back_or_knees, 
                stomach_discomfort = EXCLUDED.stomach_discomfort, 
                dietary_restrictions = EXCLUDED.dietary_restrictions, 
                allergies = EXCLUDED.allergies, 
                medical_conditions = EXCLUDED.medical_conditions, 
                foods_excluded = EXCLUDED.foods_excluded, 
                meat_excluded = EXCLUDED.meat_excluded, 
                sugary_foods_frequency = EXCLUDED.sugary_foods_frequency, 
                energy_maintenance = EXCLUDED.energy_maintenance, 
                sleep_per_night = EXCLUDED.sleep_per_night, 
                daily_water_intake_ounces = EXCLUDED.daily_water_intake_ounces, 
                daily_water_intake_cups = EXCLUDED.daily_water_intake_cups, 
                multitask = EXCLUDED.multitask, 
                people_around = EXCLUDED.people_around, 
                returning_old_habits = EXCLUDED.returning_old_habits, 
                unhealthy_choice = EXCLUDED.unhealthy_choice, 
                external_motivation = EXCLUDED.external_motivation, 
                daily_caffeine_intake = EXCLUDED.daily_caffeine_intake, 
                excluded_restaurants = EXCLUDED.excluded_restaurants, 
                meals_a_day = EXCLUDED.meals_a_day, 
                height_in_cm = EXCLUDED.height_in_cm, 
                height_feet = EXCLUDED.height_feet, 
                height_inches = EXCLUDED.height_inches, 
                bmi = EXCLUDED.bmi, 
                bmi_status = EXCLUDED.bmi_status, 
                goal_weight = EXCLUDED.goal_weight,
                weight_in_lbs = EXCLUDED.weight_in_lbs;
        `;


            await pool.query(query, [
                userId, 
                transformedAnswers.dieting_goal, 
                transformedAnswers.physical_build, 
                transformedAnswers.goal_build, 
                transformedAnswers.fitness_experience, 
                transformedAnswers.time_since_last_ideal_weight, 
                transformedAnswers.daily_schedule,
                transformedAnswers.exercise_frequency,
                transformedAnswers.after_taking_a_flight_of_stairs,
                transformedAnswers.walk_frequency,
                transformedAnswers.back_or_knees,
                transformedAnswers.stomach_discomfort,
                transformedAnswers.dietary_restrictions,
                transformedAnswers.allergies,
                transformedAnswers.medical_conditions,
                transformedAnswers.foods_excluded,
                transformedAnswers.meat_excluded,
                transformedAnswers.sugary_foods_frequency,
                transformedAnswers.energy_maintenance,
                transformedAnswers.sleep_per_night,
                transformedAnswers.daily_water_intake_ounces,
                transformedAnswers.daily_water_intake_cups,
                transformedAnswers.multitask,
                transformedAnswers.people_around,
                transformedAnswers.returning_old_habits,
                transformedAnswers.unhealthy_choice,
                transformedAnswers.external_motivation,
                transformedAnswers.daily_caffeine_intake,
                transformedAnswers.excluded_restaurants,
                transformedAnswers.meals_a_day,
                transformedAnswers.height_in_cm,
                transformedAnswers.height_feet,
                transformedAnswers.height_inches,
                transformedAnswers.bmi,
                transformedAnswers.bmi_status,
                transformedAnswers.goal_weight,
                transformedAnswers.weight_in_lbs,
            ]);

            // Commit if everything is okay
            await pool.query('COMMIT');
        }
        catch (error) {
            await pool.query('ROLLBACK');
            console.error('Error submitting answers:', error);
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

            hasUserCompletedQuestions: async function(userId) 
                {
                    try 
                        {
                            const TOTAL_QUESTIONS = 31;
                            const query = `SELECT COUNT(*) FROM answers_to_questions WHERE user_id = $1;`;
                            const result = await pool.query(query, [userId]);
                            const answeredQuestionsCount = parseInt(result.rows[0].count, 10);
                
                             return answeredQuestionsCount === TOTAL_QUESTIONS;
                        } 
                    catch (error) 
                        {
                            console.error('Error checking if user has completed questions:', error);
                            throw error;
                        }
                },
};

module.exports = questionsModel;
