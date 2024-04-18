const { findBestMatch, findBestReplacement, containsAllergensOrExclusions } = require('./handleSimilarity');
const mealSelectController = require('../../Controller/mealSelectController');
const { relatedItems } = require('../relatedItems');
const { breakfastEntrees } = require('../Backup/breakfast/breakfastEntrees');


async function handleBreakfast(breakfastData, meals, usedRestaurantIds, userData) {
    try {
        if (!meals) 
            {
                meals = await getMeals();
            }

        // Filter meals not only by breakfast flag but also ensure the restaurant hasn't been used yet today
        const breakfastMeals = meals.filter(meal => meal.breakfast === true && !usedRestaurantIds.has(meal.restaurantId));

        // Define a local function to find matching meals
        async function findMatchingMeal(category, data, restaurantId) 
            {
                let filteredMeals = breakfastMeals.filter(meal => meal.category === category && (restaurantId ? meal.restaurantId === restaurantId : true));
                let matchingMeal = findBestMatch(filteredMeals, data, category);

                if (!matchingMeal && category === 'Drink' && restaurantId !== 9) 
                    {
                        // Check GCBC for a drink if no drink found at the original restaurant
                        let gcbcDrinks = breakfastMeals.filter(meal => meal.category === 'Drink' && meal.restaurantId === 9);
                        matchingMeal = findBestMatch(gcbcDrinks, data, category);
                    } 
                else if (!matchingMeal) 
                    {
                        let relatedItemsList = relatedItems(data);
                        matchingMeal = findBestReplacement(relatedItemsList, filteredMeals, data, category);
                    }


                if (matchingMeal) 
                    {
                        console.log(`Matching breakfast ${category} found:`, matchingMeal);
                        usedRestaurantIds.add(matchingMeal.restaurantId);  // Add restaurant ID to the used set
                    } 
                else 
                    {
                        if (category === 'Entree') 
                            {
                                matchingMeal = findFallbackEntree(userData);
                            }
                    }

                return matchingMeal;
            }

        // Attempt to find a matching entree without initial restaurant bias
        let matchingEntree = await findMatchingMeal('Entree', breakfastData.entree);
        let matchingSide = {};
        let matchingDrink = {};

        // Continue to find sides and drinks using the restaurant ID of the entree if found
        if (matchingEntree) {
            matchingSide = await findMatchingMeal('Side', breakfastData.side, matchingEntree.restaurantId);
            matchingDrink = await findMatchingMeal('Drink', breakfastData.drink, matchingEntree.restaurantId);
        }

        console.log(matchingEntree);
        const breakfast = {
            entree: matchingEntree,
            side: matchingSide,
            drink: matchingDrink
        };

        return breakfast;
    } catch (error) {
        console.error('Failed to handle breakfast selection:', error);
    }
}

async function findFallbackEntree(userData) 
    {
        console.log(userData);
        let shuffledEntrees = breakfastEntrees.sort(() => 0.5 - Math.random());
        for (let entree of shuffledEntrees) 
            {
                if (!containsAllergensOrExclusions(entree.ingredients, userData.allergies, userData.foods_excluded, userData.meat_excluded)) 
                    {
                        //function containsAllergensOrExclusions(mealIngredients, userAllergies, userExclusions, meatExcluded) 
                        return entree;
                    }
                else
                    {
                        findFallbackEntree(userData);
                    }
            }
        return null; // Return null if no suitable entree is found
    }

module.exports = { handleBreakfast };
