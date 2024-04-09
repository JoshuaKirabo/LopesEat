// questionChecker.js
function questionChecker(userInput) {
    // Normalize the user input to handle different casings or slight variations
    const normalizedInput = userInput.trim().toLowerCase();


    // Check the input against a series of predefined questions
    if (normalizedInput.includes('What\'s my name')) 
        {
            console.log("Eminem");
            return "GymBro Thunder here! I recommend weights and cardio for a balanced workout.";
            
        } 
    else if (normalizedInput.includes("weight loss")) 
        {
            return "To lose weight, combine cardio exercises with a healthy diet.";
        } 
    else if (normalizedInput.includes("nutrition")) 
        {
            return "A balanced diet with proteins, carbs, and healthy fats is key for good nutrition.";
        }
    // ... other if conditions for different topics

    // If no predefined answers were found's 
    return null;
}

module.exports = { questionChecker };
