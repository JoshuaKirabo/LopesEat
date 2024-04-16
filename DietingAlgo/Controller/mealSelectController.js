
// mealSelectController.js
const { getRestaurantsModel, getMealsModel } = require('../Model/mealSelectModel');



const getRestaurants = async () => {
    try {
        const restaurants = await getRestaurantsModel();
        const restaurantList = restaurants.map(restaurant => restaurant.name).join(', ');
        return restaurantList; // Returns a string, e.g., "The Habit, Qdoba"
    } catch (error) {
        console.error('Error fetching restaurants:', error.message);
        throw error; // Rethrow or handle as needed
    }
};

const getMeals = async () => {
    try {
        // Fetch the meals with the updated structure from getMealsModel
        const entreeMeals = await getMealsModel();
        
        // If further transformation or adaptation is needed:
        const formattedMeals = entreeMeals.map(meal => ({
            id: meal.meal_id,
            restaurantId: meal.restaurant_id,
            name: meal.name,
            ingredients: meal.ingredients,
            category: meal.category,
            calories: meal.calories,
            restaurantName: meal.restaurant_name,
            serving_size: meal.serving_size_grams,
            serving_size_oz: meal.serving_size_oz,
            price: parseFloat(meal.price).toFixed(2), 
            proteins: meal.protein, 
            carbs: meal.total_carb,
            fat: meal.total_fat,
            breakfast: meal.isbreakfast
        }));

        // Send the formatted entree meals back to the client in JSON format
        return formattedMeals; // This will set Content-Type to application/json
    } 
    catch (error) 
    {
        console.error('Error getting meals:', error.message);
        throw error; // Rethrow or handle as needed

    }
}




module.exports = {
  getRestaurants,
  getMeals,
};
