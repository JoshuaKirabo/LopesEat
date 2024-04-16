const lunchEntrees = [
    {
        "restaurantId": 1,
        "name": "Turkey Tom Sandwich",
        "ingredients": "Turkey breast, lettuce, tomato, mayo, whole wheat bread",
        "calories": 300,
        "protein": "20g",
        "fat": "10g",
        "carbs": "30g",
        "servingSizeinGrams": 200,
        "price": "6.99"
    },
    {
        "restaurantId": 2,
        "name": "Grilled Chicken Salad",
        "ingredients": "Grilled chicken breast, mixed greens, tomatoes, cucumbers, balsamic vinaigrette",
        "calories": 250,
        "protein": "25g",
        "fat": "8g",
        "carbs": "15g",
        "servingSizeinGrams": 180,
        "price": "8.49"
    },
    {
        "restaurantId": 3,
        "name": "Veggie Wrap",
        "ingredients": "Whole wheat wrap, hummus, spinach, bell peppers, onions, feta cheese",
        "calories": 320,
        "protein": "12g",
        "fat": "10g",
        "carbs": "45g",
        "servingSizeinGrams": 220,
        "price": "7.99"
    },
    {
        "restaurantId": 4,
        "name": "Quinoa Bowl",
        "ingredients": "Quinoa, mixed greens, avocado, cherry tomatoes, lemon vinaigrette",
        "calories": 280,
        "protein": "8g",
        "fat": "12g",
        "carbs": "35g",
        "servingSizeinGrams": 210,
        "price": "9.99"
    },
    {
        "restaurantId": 5,
        "name": "Grilled Teriyaki Chicken",
        "ingredients": "Grilled chicken breast, steamed vegetables, teriyaki sauce",
        "calories": 350,
        "protein": "30g",
        "fat": "8g",
        "carbs": "40g",
        "servingSizeinGrams": 250,
        "price": "10.99"
    },
    {
        "restaurantId": 7,
        "name": "Southwest Chicken Salad",
        "ingredients": "Grilled chicken breast, mixed greens, black beans, corn, salsa, ranch dressing",
        "calories": 320,
        "protein": "22g",
        "fat": "14g",
        "carbs": "25g",
        "servingSizeinGrams": 220,
        "price": "8.99"
    },
    {
        "restaurantId": 8,
        "name": "Grilled Chicken Sandwich",
        "ingredients": "Grilled chicken breast, lettuce, tomato, whole wheat bun",
        "calories": 320,
        "protein": "30g",
        "fat": "10g",
        "carbs": "30g",
        "servingSizeinGrams": 230,
        "price": "7.49"
    },
    {
        "restaurantId": 9,
        "name": "Greek Yogurt Parfait",
        "ingredients": "Greek yogurt, granola, mixed berries, honey",
        "calories": 250,
        "protein": "15g",
        "fat": "8g",
        "carbs": "30g",
        "servingSizeinGrams": 180,
        "price": "5.99"
    },
    {
        "restaurantId": 10,
        "name": "Mediterranean Chicken Wrap",
        "ingredients": "Grilled chicken breast, hummus, tabbouleh, mixed greens, whole wheat wrap",
        "calories": 340,
        "protein": "25g",
        "fat": "12g",
        "carbs": "40g",
        "servingSizeinGrams": 240,
        "price": "9.49"
    },
    {
        "restaurantId": 11,
        "name": "Turkey Breast Sub",
        "ingredients": "Turkey breast, lettuce, tomato, cucumber, whole wheat bread",
        "calories": 280,
        "protein": "20g",
        "fat": "6g",
        "carbs": "35g",
        "servingSizeinGrams": 210,
        "price": "6.99"
    },
    {
        "restaurantId": 12,
        "name": "Vegetable Stir Fry",
        "ingredients": "Mixed vegetables, tofu, brown rice, teriyaki sauce",
        "calories": 300,
        "protein": "15g",
        "fat": "10g",
        "carbs": "40g",
        "servingSizeinGrams": 250,
        "price": "8.99"
    },
    {
        "restaurantId": 13,
        "name": "Turkey Sausage & Egg White Sandwich",
        "ingredients": "Whole wheat bagel, turkey sausage, egg whites, cheddar cheese",
        "calories": 470,
        "protein": "28g",
        "fat": "15g",
        "carbs": "48g",
        "servingSizeinGrams": 210,
        "price": "5.99"
    },
    {
        "restaurantId": 14,
        "name": "Grilled Salmon Salad",
        "ingredients": "Grilled salmon fillet, mixed greens, avocado, cherry tomatoes, balsamic vinaigrette",
        "calories": 320,
        "protein": "28g",
        "fat": "15g",
        "carbs": "20g",
        "servingSizeinGrams": 220,
        "price": "12.99"
    },
    {
        "restaurantId": 15,
        "name": "Margherita Pizza",
        "ingredients": "Whole wheat crust, marinara sauce, fresh mozzarella, basil",
        "calories": 290,
        "protein": "12g",
        "fat": "10g",
        "carbs": "35g",
        "servingSizeinGrams": 210,
        "price": "11.99"
    },
    {
        "restaurantId": 16,
        "name": "California Chicken Burger",
        "ingredients": "Grilled chicken breast, lettuce, tomato, avocado, whole wheat bun",
        "calories": 350,
        "protein": "30g",
        "fat": "12g",
        "carbs": "30g",
        "servingSizeinGrams": 250,
        "price": "9.99"
    },
    {
        "restaurantId": 17,
        "name": "Steak and Quinoa Bowl",
        "ingredients": "Grilled steak, quinoa, black beans, roasted vegetables, chipotle sauce",
        "calories": 380,
        "protein": "35g",
        "fat": "14g",
        "carbs": "30g",
        "servingSizeinGrams": 300,
        "price": "13.49"
    },
    {
        "restaurantId": 18,
        "name": "Acai Berry Bowl",
        "ingredients": "Acai berries, banana, granola, mixed berries, honey",
        "calories": 300,
        "protein": "10g",
        "fat": "8g",
        "carbs": "40g",
        "servingSizeinGrams": 250,
        "price": "7.99"
    },
    {
        "restaurantId": 19,
        "name": "Caprese Salad",
        "ingredients": "Fresh mozzarella, tomatoes, basil, balsamic glaze",
        "calories": 250,
        "protein": "12g",
        "fat": "15g",
        "carbs": "20g",
        "servingSizeinGrams": 180,
        "price": "8.49"
    },
    {
        "restaurantId": 20,
        "name": "Vegetarian Burrito Bowl",
        "ingredients": "Brown rice, black beans, grilled vegetables, guacamole, salsa",
        "calories": 320,
        "protein": "15g",
        "fat": "10g",
        "carbs": "45g",
        "servingSizeinGrams": 300,
        "price": "9.99"
    },
    {
        "restaurantId": 21,
        "name": "Kale Caesar Salad",
        "ingredients": "Kale, parmesan cheese, croutons, Caesar dressing",
        "calories": 280,
        "protein": "10g",
        "fat": "12g",
        "carbs": "25g",
        "servingSizeinGrams": 220,
        "price": "7.49"
    },
    {
        "restaurantId": 22,
        "name": "Grilled Chicken Power Bowl",
        "ingredients": "Grilled chicken, black beans, rice, lettuce, pico de gallo, guacamole",
        "calories": 320,
        "protein": "25g",
        "fat": "10g",
        "carbs": "30g",
        "servingSizeinGrams": 250,
        "price": "6.99"
    },
    {
        "restaurantId": 23,
        "name": "Acai Superfood Bowl",
        "ingredients": "Acai berries, banana, kale, almond milk, granola, honey",
        "calories": 290,
        "protein": "10g",
        "fat": "8g",
        "carbs": "35g",
        "servingSizeinGrams": 230,
        "price": "9.99"
    },
    {
        "restaurantId": 24,
        "name": "Mediterranean Veggie Sandwich",
        "ingredients": "Hummus, feta cheese, cucumbers, lettuce, tomato, whole wheat bread",
        "calories": 320,
        "protein": "12g",
        "fat": "10g",
        "carbs": "40g",
        "servingSizeinGrams": 220,
        "price": "8.49"
    },
    {
        "restaurantId": 25,
        "name": "Turkey Avocado Wrap",
        "ingredients": "Turkey breast, avocado, lettuce, tomato, whole wheat wrap",
        "calories": 300,
        "protein": "20g",
        "fat": "10g",
        "carbs": "25g",
        "servingSizeinGrams": 220,
        "price": "7.99"
    }
];

module.exports = { lunchEntrees };
