const { findBestMatch, findBestReplacement } = require('./handleSimilarity');
const mealSelectController = require('../../Controller/mealSelectController');
const { relatedItems, checkAllergensExtended } = require('../relatedItems');

async function handleAfternoonSnack(snackData, meals) 
{
    // Ensure meals are loaded if not provided
    if (!meals) {
        meals = await getMeals();
    }

    // Filter out only the snacks from the meals, excluding sauces
    const snackMeals = meals.filter(meal => meal.category === 'Snack');

    // Find the best matching snack entree
    let snackEntree = findBestMatch(snackMeals, snackData.entree, 'Entree');
    
    // Log whether a matching snack was found or not
    console.log(snackEntree ? "Matching afternoon snack entree found:" : "No suitable afternoon snack entree found.", snackEntree || '');

    // Optionally, return the found entree for further processing or output

    const afternoonSnack = {entree: snackEntree,};

    return afternoonSnack;
}

module.exports = { handleAfternoonSnack };
