const pool = require('../Model/databaseManager'); // Adjust the path as necessary

// Because every question is related to a certain collumn
const questionNumberToColumnName = 
    {
        '1': 'dieting_goal',
        '2': 'physical_build',
        '3': 'goal_build',
        '4': 'fitness_experience',
        '5': 'time_since_last_ideal_weight',
        '6': 'daily_schedule',
        '7': 'exercise_frequency',
        '8': 'after_taking_a_flight_of_stairs',
        '9': 'walk_frequency',
        '10': 'back_or_knees',
        '11': 'stomach_discomfort',
        '12': 'dietary_restrictions',
        '13': 'allergies',
        '14': 'medical_conditions',
        '15': 'foods_excluded',
        '16': 'meat_excluded',
        '17': 'sugary_foods_frequency',
        '18': 'energy_maintenance',
        '19': 'sleep_per_night',
        '20': 'daily_water_intake_ounces', 
        '20': 'daily_water_intake_cups', 
        '21': 'multitask',
        '22': 'people_around',
        '23': 'returning_old_habits',
        '24': 'unhealthy_choice',
        '25': 'external_motivation',
        '26': 'daily_caffeine_intake',
        '27': 'excluded_restaurants',
        '28': 'meals_a_day',
        '29': 'height_in_cm',
        '29': 'height_feet',
        '29': 'height_inches',
        '30': 'weight_in_lbs',
        '30': 'bmi',
        '30': 'bmi_status',
        '31': 'goal_weight',
    };
        
// This function takes a question number and returns the corresponding column name.
const mapQuestionNumberToColumnName = (questionNumber) => 
    {
        console.log("mapQuestionNumberToColumnName");
        return questionNumberToColumnName[questionNumber.toString()] || null;
    };

const transformAnswersBasedOnQuestionNumber = (answers) => {
    console.log("transformAnswersBasedOnQuestionNumber");
    const transformed = {};
    answers.forEach(({ questionNumber, answer }) => {
        const columnName = mapQuestionNumberToColumnName(questionNumber);
        let valueToLog = answer;

        if (questionNumber === 10) 
            {
                // Question 10: Handle back_or_knees
                const selections = Object.keys(answer).filter(key => answer[key] === true);
                if (selections.includes('neither')) 
                    {
                        transformed['back_or_knees'] = [];
                    } 
                else 
                    {
                        transformed['back_or_knees'] = selections;
                    }
                valueToLog = selections.join(',');
            }
        else if (questionNumber === 12) 
            {
                // Assuming the answer for question 12 is an array of strings
                // Directly assign this array to the appropriate column
                transformed[columnName] = answer;
            }
        else if (questionNumber === 13) 
            {
                // Question 13: Handle allergies
                const allergies = Object.keys(answer).filter(key => answer[key] === true);
                transformed['allergies'] = allergies;
                valueToLog = allergies.join(',');
            } 
        else if (questionNumber === 14) 
            {
                // Question 14: Handle medical_conditions
                const medicalConditions = Object.keys(answer).filter(key => answer[key] === true);
                transformed['medical_conditions'] = medicalConditions;
                valueToLog = medicalConditions.join(',');
            } 
        else if (questionNumber === 15) 
            {
                // Question 15: Handle foods_excluded
                const foodsExcluded = Object.keys(answer).filter(key => answer[key] === true);
                transformed['foods_excluded'] = foodsExcluded;
                valueToLog = foodsExcluded.join(',');
            } 
        else if (questionNumber === 16) 
            {
                const meatsExcluded = Object.keys(answer).filter(key => answer[key] === true);
                transformed['meat_excluded'] = meatsExcluded;
            } 
        else if (questionNumber === 20) 
            {
                // Extract the cups and ounces from the answer array
                const [cups, ounces] = answer;
    
                // Ensure the values are treated as integers
                transformed['daily_water_intake_cups'] = parseInt(cups, 10);
                transformed['daily_water_intake_ounces'] = parseInt(ounces, 10);
            }
        else if (questionNumber === 29) 
            {
                // Directly handle the answer as an array of numbers
                const feet = answer[0];
                const inches = answer[1];
                transformed['height_feet'] = feet;
                transformed['height_inches'] = inches;
                // Calculate and store height in cm
                const heightInCm = Math.round(((feet * 12) + inches) * 2.54);
                transformed['height_in_cm'] = heightInCm;
                console.log(`Question ${questionNumber}: Feet: ${feet}, Inches: ${inches}, CM: ${heightInCm}`);
            }
        else if (questionNumber === 30) 
            {
                // Destructure the array to get bmi, weight, and bmi_status
                const [bmi, weightInLbs, bmiStatus] = answer;
                transformed['bmi'] = parseFloat(bmi); // Ensure it's stored as a float
                transformed['weight_in_lbs'] = parseInt(weightInLbs, 10); // Ensure it's stored as an integer
                transformed['bmi_status'] = bmiStatus; // Assuming it's a string like 'Normal'
            }
        // Incase of any unhandled special questions
        else if (Array.isArray(answer)) 
            {
                
                transformed[columnName] = answer; 
            } 
        else if (typeof answer === 'object' && answer !== null) 
            {
                const selectedOptions = Object.entries(answer)
                    .filter(([_, value]) => value)
                    .map(([key, _]) => key);
                transformed[columnName] = `{${selectedOptions.join(',')}}`;
                valueToLog = `{${selectedOptions.join(',')}}`;
            } 
        else 
            {
                transformed[columnName] = answer;
            }

        console.log(`Question ${questionNumber}: ${valueToLog}`);
    });
    return transformed;
};;

// Transform special question answers to IDs
const transformSpecialQuestionsToIDs = async (answers) => {
    
    console.log("Dietary restrictions before fetching IDs:", answers.dietary_restrictions);
console.log("Allergies before fetching IDs:", answers.allergies);
console.log("Medical conditions before fetching IDs:", answers.medical_conditions);
console.log("Foods excluded before fetching IDs:", answers.foods_excluded);

    const transformed = { ...answers }; // Copy original answers to avoid mutating
    console.log("transformSpecialQuestionsToIDs");

    if (answers.allergies) {
        const allergyNames = Object.keys(answers.allergies).filter(key => answers.allergies[key]);
        // Assuming fetchIDsForValues returns an array of IDs
        const allergyIDs = await fetchIDsForValues('allergens', allergyNames);
        transformed.allergies = allergyIDs;
    }

    if (answers.question30) {
        const [bmi, _, bmiStatus] = answers.question30;
        transformed.bmi = bmi;
        transformed.bmi_status = bmiStatus; // Ensure this is the correct column name for BMI status
    }
    // Handle dietary_restrictions, allergies, medical_conditions, foods_excluded
    console.log(answers.dietary_restrictions);
    console.log(answers);
    if (answers.dietary_restrictions) {
        transformed.dietary_restrictions = await fetchIDsForValues('dietary_restrictions', answers.dietary_restrictions);
    }
    if (answers.allergies) {
        const allergyNames = Object.keys(answers.allergies).filter(key => answers.allergies[key]);
        transformed.allergies = await fetchIDsForValues('allergens', allergyNames);
    }
    if (answers.medical_conditions) {
        const conditionNames = Object.keys(answers.medical_conditions).filter(key => answers.medical_conditions[key]);
        transformed.medical_conditions = await fetchIDsForValues('medical_conditions', conditionNames);
    }
    if (answers.foods_excluded) {
        const excludedFoodNames = Object.keys(answers.foods_excluded).filter(key => answers.foods_excluded[key]);
        transformed.foods_excluded = await fetchIDsForValues('allergens', excludedFoodNames);
    }

    return transformed;
};

// Example usage
const cleanUpAnswers = async (rawAnswers) => {
    console.log("cleanUpAnswers");
    // Ensure rawAnswers is correctly structured as an array
    const structuredAnswers = Array.isArray(rawAnswers) ? rawAnswers : [];
    console.log("The answers are: ", rawAnswers);
    console.log("Structured Answers: ", structuredAnswers);

    let answers = transformAnswersBasedOnQuestionNumber(structuredAnswers);

    // Log the final transformed answers for verification
    Object.entries(answers).forEach(([question, answer]) => {
        console.log(`Question ${question}: ${answer}`);
    });

    return answers
};

module.exports = cleanUpAnswers;
