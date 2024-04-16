// handleLunch.js

const { findBestMatch, findBestReplacement, containsAllergensOrExclusions } = require('./handleSimilarity');
const { getMeals } = require('../Controller/mealSelectController');
const { relatedItems } = require('../relatedItems');
const { lunchEntrees } = require('../Backup/lunch/lunchEntrees'); // Ensure this module is correctly set up


async function handleLunch(lunchData, meals, usedRestaurantIds, userData) {
    try {
        if (!meals) {
            meals = await getMeals();
        }

        // Filter meals that are not exclusive to breakfast or can serve as lunch
        const lunchMeals = meals.filter(meal => (!meal.breakfast || meal.lunch) && !usedRestaurantIds.has(meal.restaurantId));

        async function findMatchingMeal(category, data, restaurantId) {
            let filteredMeals = lunchMeals.filter(meal => meal.category === category && (restaurantId ? meal.restaurantId === restaurantId : true));

            let matchingMeal = findBestMatch(filteredMeals, data, category);

            // Check GCBC for drinks if no matching drink is found at the restaurant
            if (!matchingMeal && category === 'Drink') {
                let gcbcDrinks = meals.filter(meal => meal.category === 'Drink' && meal.restaurantId === 9);
                matchingMeal = findBestMatch(gcbcDrinks, data, 'Drink');
                console.log(matchingMeal ? "GCBC drink found for lunch:" : "No suitable drink found at GCBC for lunch.");
            } else if (!matchingMeal && category === 'Entree') {
                matchingMeal = findFallbackLunchEntree(userData);
            }

            if (matchingMeal) {
                console.log(`Matching lunch ${category} found:`, matchingMeal);
                usedRestaurantIds.add(matchingMeal.restaurantId); // Ensure restaurant ID is noted to avoid reuse
            }

            return matchingMeal;
        }

        let matchingEntree = await findMatchingMeal('Entree', lunchData.entree);
        let matchingSide = matchingEntree ? await findMatchingMeal('Side', lunchData.side, matchingEntree.restaurantId) : null;
        let matchingDrink = matchingEntree ? await findMatchingMeal('Drink', lunchData.drink, matchingEntree.restaurantId) : null;

        const lunch = {
            entree: matchingEntree,
            side: matchingSide,
            drink: matchingDrink
        };

        return lunch;
    } catch (error) {
        console.error('Failed to handle lunch selection:', error);
    }
}

async function findFallbackLunchEntree(userData) {
    let shuffledEntrees = lunchEntrees.sort(() => 0.5 - Math.random());
    for (let entree of shuffledEntrees) {
        if (!containsAllergensOrExclusions(entree.ingredients, userData.allergies, userData.foods_excluded, userData.meat_excluded)) {
            console.log("Fallback lunch entree found");
            return entree;
        }
    }
    console.log("No suitable fallback lunch entree found");
    return null;
}

module.exports = { handleLunch };
