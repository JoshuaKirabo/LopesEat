const { findBestMatch, findBestReplacement, containsAllergensOrExclusions } = require('./handleSimilarity');
const { relatedItems } = require('../relatedItems');
const { dinnerEntrees } = require('../Backup/dinner/dinnerEntrees'); // Ensure this is the correct path

const mealSelectController = require('../../Controller/mealSelectController');


async function handleDinner(dinnerData, meals, usedRestaurantIds) 
    {
        if (!meals) 
            {
                meals = await getMeals();
            }

        // Filter for non-breakfast meals
        const dinnerMeals = meals.filter(meal => !meal.breakfast && !usedRestaurantIds.has(meal.restaurantId));
        
        // Find matching entree
        let matchingEntree = findBestMatch(dinnerMeals.filter(meal => meal.category === 'Entree'), dinnerData.entree, 'Entree');

        if (!matchingEntree) 
            {
                matchingEntree = findFallbackDinnerEntree(dinnerData); // Fallback function to handle no matching entree
                console.log("Fallback dinner entree used:", matchingEntree);
            } 
        else 
            {
                console.log("Matching dinner entree found:", matchingEntree);
                usedRestaurantIds.add(matchingEntree.restaurantId); // Adding restaurant ID to used set
            }

        // Attempt to find matching side and drink using the entree's restaurant ID
        let matchingSide = {}, matchingDrink = {};
        if (matchingEntree) 
            {
                let restaurantMeals = dinnerMeals.filter(meal => meal.restaurantId === matchingEntree.restaurantId);
                matchingSide = findBestMatch(restaurantMeals.filter(meal => meal.category === "Side"), dinnerData.side, 'Side');

                matchingDrink = findBestMatch(restaurantMeals.filter(meal => meal.category === "Drink"), dinnerData.drink, 'Drink');

                if (!matchingDrink) 
                    {
                        let gcbcDrinks = meals.filter(meal => meal.category === 'Drink' && meal.restaurantId === 9);
                        matchingDrink = findBestMatch(gcbcDrinks, dinnerData.drink, 'Drink');
                        console.log(matchingDrink ? "GCBC drink found for dinner:" : "No suitable drink found at GCBC for dinner.");
                    }
            }

        const dinner = {
            entree: matchingEntree,
            side: matchingSide,
            drink: matchingDrink
        };

        console.log("Complete dinner plan:", dinner);
        return dinner;
    }

async function findFallbackDinnerEntree(dinnerData) 
    {
        let shuffledEntrees = dinnerEntrees.sort(() => 0.5 - Math.random());

        for (let entree of shuffledEntrees) 
            {
                if (!containsAllergensOrExclusions(entree.ingredients, dinnerData.allergens, dinnerData.exclusions)) 
                    {
                        return entree;
                    }
            }
        return null; // Return null if no suitable entree is found
    }

module.exports = { handleDinner };
