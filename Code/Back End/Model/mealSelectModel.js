const pool = require('../Model/databaseManager');

const getRestaurantsModel = async () => 
    {
        try 
            {
                const results = await pool.query('SELECT * FROM public.restaurants ORDER BY restaurant_id ASC');
                return results.rows;
            } 
        catch (error) 
            {
                console.error('Error executing query:', error.stack);
                throw error;
            }
    }

const getMealsModel = async () => 
    {
        try 
            {
                const queryText = `
                SELECT meals.restaurant_id, meals.meal_id, meals.name, meals.ingredients, meals.calories, meals.category, meals.serving_size_grams,
                    meals.price, meals.total_fat, meals.total_carb, meals.protein, meals.isbreakfast, meals.serving_size_oz,
                    restaurants.name AS restaurant_name
                FROM public.meals
                JOIN public.restaurants ON meals.restaurant_id = restaurants.restaurant_id
                ORDER BY meals.meal_id ASC
                `;
                const results = await pool.query(queryText);

                return results.rows; 
            }
        catch (error) 
            {
                console.error('Error executing query:', error.stack);
                throw error;
            }
    };


    

module.exports = {
            getRestaurantsModel,
            getMealsModel,
          };

