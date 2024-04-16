// compareMeals.js
const { getMeals } = require('./Controller/mealSelectController');
const {relatedItems, checkAllergensExtended} = require('./relatedItems');
const { getOpenAIResponse } = require('./OpenAI_API');
const { handleBreakfast } = require('./handleMeals/handleBreakfast');
const { handleMorningSnack } = require('./handleMeals/handleMorningSnack');
const { handleLunch } = require('./handleMeals/handleLunch');
const { handleAfternoonSnack } = require('./handleMeals/handleAfternoonSnack');
const { handleDinner } = require('./handleMeals/handleDinner');
const { containsAllergensOrExclusions } = require('./handleMeals/handleSimilarity');

let breakfast = {};
let morningSnack = {};
let lunch = {};
let afternoonSnack = {};
let dinner = {};

async function getGCUMeals(mealPlan, userData) 
    {

        try 
            {
                meals = await getMeals(); // Fetch meals once
                const usedRestaurantIds = new Set();
                const usedMealIds = new Set();
                dayMealPlan = {};
    
                

                // Convert strings to arrays if they are not already arrays
                const userAllergies = Array.isArray(userData.allergies) ? userData.allergies : userData.allergies.split(',').map(s => s.trim());
                const foodsExcluded = Array.isArray(userData.foods_excluded) ? userData.foods_excluded : userData.foods_excluded.split(',').map(s => s.trim());
                const meatExcluded = Array.isArray(userData.meat_excluded) ? userData.meat_excluded : userData.meat_excluded.split(',').map(s => s.trim());

                // Filter meals for allergens and exclusions
                meals = meals.filter(meal => !containsAllergensOrExclusions(meal.ingredients, userAllergies, foodsExcluded, meatExcluded));

                // Process each meal type
                if (mealPlan.breakfast) 
                    {

                        breakfast = await handleBreakfast(mealPlan.breakfast, meals, usedRestaurantIds, userData);
                        usedRestaurantIds.add(breakfast.entree.restaurantId);
                        console.log("Excluded Mwals: ", usedRestaurantIds);
                    }
                if (mealPlan.morningSnack) 
                    {
                        morningSnack = await handleMorningSnack(mealPlan.morningSnack, meals, usedRestaurantIds, userData);
                        usedRestaurantIds.add(morningSnack.entree.restaurantId);
                    }
                    
                if (mealPlan.lunch) 
                    {
                        lunch = await handleLunch(mealPlan.lunch, meals, usedRestaurantIds, userData);
                        usedRestaurantIds.add(lunch.entree.restaurantId);
                    
                    }
                if (mealPlan.afternoonSnack) 
                    {
                        afternoonSnack = await handleAfternoonSnack(mealPlan.afternoonSnack, meals, usedRestaurantIds, userData);
                        usedRestaurantIds.add(afternoonSnack.entree.restaurantId);
                    }
                if (mealPlan.dinner) 
                    {
                        dinner = await handleDinner(mealPlan.dinner, meals, usedRestaurantIds, userData);
                        usedRestaurantIds.add(dinner.entree.restaurantId);
                    }

                // Calculate total day macros
                const totals = calculateTotalDayMacros(dayMealPlan);
                dayMealPlan.totalDayCalories = totals.calories;
                dayMealPlan.totalProteins = totals.proteins;
                dayMealPlan.totalCarbs = totals.carbs;
                dayMealPlan.totalFats = totals.fats;

                // Record meal IDs to avoid repetition

                dayMealPlan = {breakfast, morningSnack, lunch, afternoonSnack,dinner};


                console.log("Meal plan for the day",dayMealPlan);
                return dayMealPlan;
            } 
        catch (error) 
            {
                console.error("Failed to process meals due to an error:", error);
            }
    }

function calculateTotalDayMacros(dayMealPlan) 
    {
        let totalCalories = 0;
        let totalProteins = 0;
        let totalCarbs = 0;
        let totalFats = 0;
    
        Object.values(dayMealPlan).forEach(meal => 
            {
                if (meal) 
                    {
                        ['entree', 'side', 'drink', 'dessert'].forEach(part => 
                            {
                                if (meal[part]) 
                                    {
                                        totalCalories += meal[part].calories || 0;
                                        totalProteins += parseFloat(meal[part].proteins) || 0;
                                        totalCarbs += parseFloat(meal[part].carbs) || 0;
                                        totalFats += parseFloat(meal[part].fat) || 0;
                                    }
                            });
                    }
            });
    
        return {
            calories: totalCalories,
            proteins: totalProteins,
            carbs: totalCarbs,
            fats: totalFats
        };
    }

module.exports = { getGCUMeals };