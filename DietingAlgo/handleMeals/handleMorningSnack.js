const { findBestMatch, findBestReplacement } = require('./handleSimilarity');
const { getMeals } = require('../Controller/mealSelectController');
const { relatedItems, checkAllergensExtended } = require('../relatedItems');

async function handleMorningSnack(snackData, meals) {
    // Ensure meals are loaded if not already provided
    if (!meals) {
        meals = await getMeals();
    }

    // Filter out only the snacks from the meals
    const snackMeals = meals.filter(meal => meal.category === 'Snack');

    // Find the best matching snack entree
    let snackEntree = findBestMatch(snackMeals, snackData.entree, 'Entree');
    
    // Log the outcome of the match attempt
    console.log(snackEntree ? "Matching morning snack entree found:" : "No suitable morning snack entree found.", snackEntree || '');

    // Optionally, check and handle sauce if specified in the snack data
    let snackSauce = {};
    if (snackData.sauce && snackData.sauce.sauceName) {
        snackSauce = findBestMatch(snackMeals, snackData.sauce.sauceName, 'Sauce');
        console.log(snackSauce ? "Matching morning snack sauce found:" : "No suitable morning snack sauce found.", snackSauce || '');
    }

    // Construct the snack object to be returned
    const morningSnack = {
        entree: snackEntree,
        sauce: snackSauce
    };

    return morningSnack;
}

module.exports = { handleMorningSnack };

