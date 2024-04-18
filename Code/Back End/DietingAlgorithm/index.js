//index.js

const { handleDietingGoal, calculateTDEE } = require('./dietingGoal');
const { formartAnswers, formartQuestion10 } = require('./formatAnswers');
const { getOpenAIResponse } = require('./OpenAI_API');
const { storeMeals } = require('./howManyMeals');

const { getGCUMeals } = require('./compareMeals');

const mealSelectController = require('../Controller/mealSelectController');

const backupData = require('./backupData');

// Where we will store the meals for the entire two week period


const userData = {
  dieting_goal: 'weight_loss',
  physical_build: 'stocky',
  goal_build: 'shredded',
  fitness_experience: 'easy_gain_hard_lose',
  time_since_last_ideal_weight: 'never',
  daily_schedule: 'active',
  exercise_frequency: 'several-times-a-month',
  after_taking_a_flight_of_stairs: 'easily_walk_up_flights',
  walk_frequency: 'once_a_month',
  back_or_knees: [ 'knees', 'back' ],
  stomach_discomfort: 'yes',
  dietary_restrictions: [
    'paleolithic',
    'mediterranean',
    'whole30',
    'low_carb',
    'intermittent_fasting',
    'dash'
  ],
  allergies: [
    'eggs',    'soy',
    'fish',    'tree_nuts',
    'mustard', 'sesame_seeds',
    'celery',  'sulfites', 'lupin'
  ],
  medical_conditions: [
    'diabetes_type_1',
    'diabetes_type_2',
    'gestational_diabetes',
    'kidney_stones' 
  ],
  foods_excluded: [
    'milk',
    'eggs',
    'soy',
    'shellfish',
    'mustard'
  ],
  meat_excluded: [
    'chicken', 'beef',
    'duck',    'fish',
  ],
  sugary_foods_frequency: 'daily',
  energy_maintenance: 'drag_before_meals',
  sleep_per_night: 'more-than-8-hours',
  daily_water_intake_cups: 2,
  daily_water_intake_ounces: 32,
  multitask: 5,
  people_around: 4,
  returning_old_habits: 4,
  unhealthy_choice: 4,
  external_motivation: 4,
  daily_caffeine_intake: 'more-than-300mg',
  excluded_restaurants: '{pizza,fast food,bagels, sandwiches,healthy,coffee, tea}',
  meals_a_day: '5',
  height_feet: 5,
  height_inches: 5,
  height_in_cm: 165,
  bmi: 92.19,
  weight_in_lbs: 250,
  bmi_status: 'Obese Class 2',
  goal_weight: '140',
  gender: 'Male',
  age: 24,
};

async function getRestaurants() 
  {
    try 
      {
        const restaurants = await mealSelectController.getRestaurants();
        console.log("RESTAURANTS",restaurants);
          
          return restaurants
      } 
    catch (error) 
      {
          console.error('Failed to fetch restaurants:', error);
      }
  }

const generateMealPlan = async (userData, studentId) => 
  {
    let twoWeeksMeals = {
      day1: {}, day2: {}, day3: {}, day4: {}, day5: {},
      day6: {}, day7: {} };
    try 
      {

        const formattedRestaurants = await getRestaurants();

        // Loop for two days as a test phase
        for (let day = 1; day <= 2; day++) 
          {
            console.log(`Planning meals for Day ${day}`);
            
            // The user can order food from any of these restaurants unless they specify: ${formattedRestaurants}. Herd Stop is basically the University Walmart. Fresh Fusion - Build Your Own Salad
            // Unless a drink is from Grand Canyon Beverage Co, all drinks on meals should be from that same restaurant
            const prompt = `
            Generate a COMPLETE 1 day meal plan for the following user do not omit anything for brevity
            ONLY return JSON data in this format

            The days will look like this: {{breakfast, totalDayCalories} if user prefers to eat 2 meals, {{breakfast, lunch, dinner, totalDayCalories} if user prefers to eat 3 meals, {{breakfast, lunch, afternoonSnack, dinner, totalDayCalories} if user prefers to eat 4 meals, {{breakfast, morningSnack, lunch, afternoonSnack,dinner, totalDayCalories} if user prefers to eat 5 meals
            The more the meals, the smaller the portions to prevent over eating
            For breakfast, focus more on breakfast eating options e.g fruits and pancakes etc. DO NOT LIST SMOOTHIES AS ENTREES
            The user can order food from any of these restaurants unless they specify: ${formattedRestaurants}. Herd Stop is basically the University Walmart. Fresh Fusion - Build Your Own Salad
            Unless a drink is from Grand Canyon Beverage Co, all drinks on meals should be from that same restaurant

            the meals (Breakfast, lunch, Supper) will look like this {entree{name,ingredients, calories}, side, drink{name,size:(s,m,l?),calories}, totalMealcalories}
            Drinks are optional on the snacks
            If a user enjoys sweet things, or enjoys caffeine, let us find a way to incorporate them into their diet e.g via snacks or dessert
            Ensure to consider the TDEE when making this meal plan. ALSO ENSURE TO INCLUDE A SAUCE. IF YOU HAVE NONE, SAY NULL. 

            User 

            Example:

            {
            "breakfast": 
              {
                "entree": 
                  {
                    "name": 
                    "ingredients": 
                    "calories":
                    "servingSizeinGram"s: example 187g 
                  },
                "side":
                  {
                    "name": 
                    "ingredients": 
                    "calories": 
                    "servingSizeinGram": 
                  } 
                "drink": 
                  {
                    "name": 
                    "calories": 
                    "ingredients":
                    "servingSizeinOZ": eg 32oz
                  },
                "sauce": 
                "dessert": 
                  {
                    "name":  
                    "ingredients":  
                    "calories":
                    "qty:"
                  },
                "totalMealCalories": 
              },
            "morningSnack": 
              {
                "entree": 
                {
                  "name": 
                  "ingredients": 
                  "calories":
                  "servingSizeinGram"s: 
                },
                "totalMealCalories": 
              },
            "lunch": 
              {
                "entree": 
                {
                  "name": 
                  "ingredients": 
                  "calories": 
                  "servingSizeinGram"s: 
                },
                "side":
                {
                  "name": 
                  "ingredients": 
                  "calories": 
                  "servingSizeinGram"s: example 187g 
                } 
                "drink": 
                {
                  "name": 
                  "calories": 
                  "servingSizeinOZ": eg 32oz 
                  "ingredients":
                },
                "dessert": 
                {
                  "name":  
                  "ingredients":  
                  "calories":
                  "qty:"
                },
                "totalMealCalories": 
              },
            "afternoonSnack": 
              {
                "entree": 
                {
                  "name": 
                  "ingredients": 
                  "calories": 
                },
                "totalMealCalories": 
              },
            "dinner": 
            {
              "entree": 
              {
                "name": 
                "ingredients": 
                "calories": 
                "servingSizeinGram"s: 
              },
              "side":
              {
                "name": 
                "ingredients": 
                "calories": 
                "servingSizeinGram"s: example 187g 
              } 
              "drink": 
              {
                "name": 
                "calories": 
                "servingSizeinOZ": eg 32oz
                "ingredients": 
              },
              "dessert": 
              {
                "name":  
                "ingredients":  
                "calories":
                "qty:"
              },
              "totalMealCalories": 
            },
            "totalDayCalories":
            }


          Question: What is your dieting goal? Answer: ${userData.dieting_goal}
          Question: How would you describe your Physical Build? Answer: ${userData.physical_build}
          Question: How would you describe your goal Physical Build? Answer: ${userData.goal_build}
          Question: What best describes your experience with fitness? Answer: ${formartAnswers(userData.fitness_experience)}
          Question: How long has it been since you were last at your ideal weight? Answer: ${userData.time_since_last_ideal_weight}
          Question: How active are you during the day? Answer: ${userData.daily_schedule}
          Question: How often do you exercise? Answer: ${userData.exercise_frequency}
          Question: Are you out of breath after walking up a flight of stairs? Answer: ${formartAnswers(userData.after_taking_a_flight_of_stairs)}
          Question: How often do you go for walks? Answer: ${userData.walk_frequency}
          ${formartQuestion10(userData.back_or_knees)}
          I am on the following diets: ${userData.dietary_restrictions.join(', ')}
          I am allergic to the following: ${userData.allergies.join(', ')}
          I suffer from the following medical conditions: ${userData.medical_conditions.join(', ')}
          I am not allergic to these, I just want to exclude them from my meal plan: ${userData.foods_excluded.join(', ')}
          These are the meats I would like to exclude from my meal plan: ${userData.meat_excluded.join(', ')}
          Question: How often do you eat or drink sugary foods or beverages? Answer: ${formartAnswers(userData.sugary_foods_frequency)}
          Question: How much do you sleep per night? Answer: ${userData.sleep_per_night}
          Question: How many glasses of water do you take in a day? Answer: ${userData.daily_water_intake_ounces} ounces or ${userData.daily_water_intake_cups} cups
          Question: I usually do other things while I eat (watch TV, Scroll through social media) Answer: ${userData.multitask} / 5
          Question: It is hard to keep a healthy routine because of people around me Answer: ${userData.people_around} / 5
          Question: I only manage to eat healthy for a couple of weeks before returning to my old habits Answer: ${userData.returning_old_habits} / 5
          Question: One unhealthy choice makes me feel a disappointment which makes me make more bad choices Answer: ${userData.unhealthy_choice} / 5
          Question: I require external motivation to keep going Answer: ${userData.external_motivation} / 5
          Question: How much caffeine do you take daily on average? Answer: ${userData.daily_caffeine_intake}
          Question: How many times a day do you want to eat? Answer: ${userData.meals_a_day}
          Question: How tall are you? Answer: ${userData.height_feet} ft ${userData.height_inches} inch or ${userData.height_in_cm} cm
          Question: What is your weight? Answer: ${userData.weight_in_lbs} lbs
          Question: What is your goal weight? Answer: ${userData.goal_weight}
          Calculated BMI: ${userData.bmi} ${userData.bmi_status}
          Calculated TDEE: ${calculateTDEE(userData)}
          `.trim();

        /*mealsForTheDay =  {
            breakfast: {
            entree: {
              name: 'Coconut Flour Pancakes',
              ingredients: 'Coconut flour, almond milk, baking powder, olive oil, cinnamon',
              calories: 300,
              servingSizeinGrams: 150
            },
            side: {
              name: 'Fresh Berry Mix',
              ingredients: 'Blueberries, raspberries, strawberries',
              calories: 70,
              servingSizeinGram: 100
            },
            drink: {
              name: 'Black Coffee',
              calories: 2,
              ingredients: 'Water, coffee beans',
              servingSizeinOZ: 8
            },
            sauce: null,
            dessert: {
              name: 'Maple syrup',
              ingredients: 'Pure maple syrup',
              calories: 100,
              qty: '2 tbsp'
            },
            totalMealCalories: 472
          },
          lunch: {
            entree: {
              name: 'Grilled Turkey Salad',
              ingredients: 'Turkey breast, mixed greens, cherry tomatoes, cucumbers, balsamic vinegar, olive oil',
              calories: 350,
              servingSizeinGrams: 200
            },
            side: {
              name: 'Mixed Nuts',
              ingredients: 'Almonds, walnuts',
              calories: 200,
              servingSizeinGrams: 50
            },
            drink: {
              name: 'Iced Green Tea',
              calories: 0,
              ingredients: 'Water, green tea leaves',
              servingSizeinOZ: 12
            },
            sauce: { sauceName: 'Balsamic Vinaigrette', quantity: '1 tbsp' },
            dessert: null,
            totalMealCalories: 550
          },
          afternoonSnack: {
            entree: {
              name: 'Carrot Sticks',
              ingredients: 'Fresh carrots',
              calories: 35,
              servingSizeinGrams: 85
            },
            sauce: { sauceName: 'Hummus', quantity: '2 tbsp' },
            totalMealCalories: 135
          },
          dinner: {
            entree: {
              name: 'Zucchini Noodles with Lemon Garlic Shrimp',
              ingredients: 'Zucchini, shrimp, garlic, lemon, parsley, olive oil',
              calories: 400,
              servingSizeinGrams: 220
            },
            side: {
              name: 'Kale Chips',
              ingredients: 'Kale, olive oil, salt',
              calories: 100,
              servingSizeinGrams: 30
            },
            drink: {
              name: 'Sparkling Water',
              calories: 0,
              servingSizeinOZ: 12,
              ingredients: 'Carbonated water'
            },
            sauce: null,
            dessert: null,
            totalMealCalories: 500
          }
        }*/



        let mealsForTheDay;

          try 
            {
               const response = await getOpenAIResponse(prompt);
               mealsForTheDay = JSON.parse(response);
            } 
          catch (error) 
            {
                mealsForTheDay = await getBackupMeals();
            }

          const suggestedMeals = storeMeals(mealsForTheDay, Number(userData.meals_a_day));
                  
          // Comparing The data sent by the OpenAI API with what is in our meals DB to return standard meals
          // performMealMatching(suggestedMeals,formattedRestaurants, userData);

          let gcuMeals = await getGCUMeals(suggestedMeals, userData);
          // Store the processed meals for the day in the two weeks plan
          twoWeeksMeals[`day${day}`] = gcuMeals;
          // Example log to check what's being stored
          console.log(`Meals planned for Day ${day}:`, twoWeeksMeals[`day${day}`]);
        }

        return twoWeeksMeals;
      
            
      } 
    catch (error) 
      {
        console.error("An error occurred:", error);
      }
  };

  async function getBackupMeals() 
    {
      try 
        {
          const randomIndex = Math.floor(Math.random() * backupData.length);
          return backupData[randomIndex];
        } 
      catch (error) 
        {
            console.error("Error reading backup meal file:", error);
            return {}; 
        }
    }
module.exports = {generateMealPlan};




