const { getRestaurantsModel, getMealsModel, getUserData } = require('../Model/mealSelectModel');


const mealSelectController = {
    getRestaurants: async () => {
        try {
            const restaurants = await getRestaurantsModel();
            return restaurants.map(restaurant => restaurant.name).join(', ');
        } catch (error) {
            console.error('Error fetching restaurants:', error.message);
            throw error;
        }
    },

    getMeals: async () => {
        try {
            const meals = await getMealsModel();
            return meals.map(meal => ({
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
        } catch (error) {
            console.error('Error getting meals:', error.message);
            throw error;
        }
    },
};

module.exports = mealSelectController;
