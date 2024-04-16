// handleSimilarity.js
const {relatedItems, checkAllergensExtended} = require('../relatedItems');

// start by having the meals as null
let meals = null;

// Score the best match
let matchingMeal = null;

// The highest score
let highestScore = 0;


// Filter out allergies and excluded foods
function containsAllergensOrExclusions(mealIngredients, userAllergies, userExclusions, meatExcluded) 
    {
       // Convert all meal ingredients to lowercase to ensure case-insensitive comparison

        const mealIngredientsLower = mealIngredients.map(ingredient => ingredient.toLowerCase());

       // Combine user allergies and exclusions into a single array
       const combinedAllergens = [...userAllergies, ...userExclusions, ...meatExcluded];
    
      // First check: directly check against the combined list of allergens and exclusions
      let containsAllergens = combinedAllergens.some(allergen =>mealIngredientsLower.some(ingredient => ingredient.includes(allergen.toLowerCase())));
        // If the first check doesn't find any allergens, call expandEggAllergens and check again
        if (containsAllergens) 
            {
                return containsAllergens;
            }
        else
            {
                const expandedAllergens = checkAllergensExtended(combinedAllergens, mealIngredientsLower);
                return expandedAllergens;
            }
    }

// Because the ingredients are sent as a string
function convertIngredientsStringToArray(ingredients) 
    {
        if (typeof ingredients === 'string') 
            {
                // Split the string by comma and map through each item to trim white spaces
                return ingredients.split(',').map(ingredient => ingredient.trim());
            }
        return ingredients; // Return as is if it's already an array
    }
// Comparing the names
function nameSimilarity(apiName, dbName) 
    {
        console.log()
        // Convert names to lower case and split into words
        const apiNameWords = new Set(apiName.toLowerCase().split(/\s+/));
        const dbNameWords = new Set(dbName.toLowerCase().split(/\s+/));
    
        // Calculate intersection
        const intersection = new Set([...apiNameWords].filter(word => dbNameWords.has(word)));
    
        // Return the proportion of matching words to the total words in API name
        return intersection.size / apiNameWords.size;
    }

// Jaccard Similarity Function to calculate how similar the ingredient sets are
function jaccardSimilarity(arrayA, arrayB) 
    {

        const setA = new Set(arrayA.map(item => item.toLowerCase().trim()));
        const setB = new Set(arrayB.map(item => item.toLowerCase().trim()));

        const intersection = new Set([...setA].filter(x => setB.has(x)));
        const union = new Set([...setA, ...setB]);

        return intersection.size / union.size;
    }

// Normalized difference to compare the calories and serving size
function normalizedDifference(value1, value2, maxDifference) 
    {
        // Check if either value is not a number or undefined
        if (isNaN(value1) || value1 === undefined || isNaN(value2) || value2 === undefined) 
            {
                return 0;  // Return a neutral score of 0 when data is incomplete
            }
        return 1 - Math.abs(value1 - value2) / maxDifference;
    }


// Calculating the overall meal score
function calculateMealScore(apiMeal, dbMeal, maxCalorieDifference, maxGramDifference, category) 
    {
        if(dbMeal.name === "Grilled Turkey Salad")
        {
            const ingredientSetApi = convertIngredientsStringToArray(apiMeal.ingredients);
            const ingredientSetDb = dbMeal.ingredients;
    
            const ingredientSimilarity = jaccardSimilarity(ingredientSetApi, ingredientSetDb);
            const calorieScore = normalizedDifference(apiMeal.calories, dbMeal.calories, maxCalorieDifference);
            const servingSizeScore = normalizedDifference(apiMeal.servingSizeinGrams, dbMeal.serving_size, maxGramDifference);
            const nameScore = nameSimilarity(apiMeal.name, dbMeal.name);
            
            // Simplified category matching: directly comparing API meal category with DB meal category
            const apiCategory = apiMeal.category ? apiMeal.category.toLowerCase() : "";
            const dbCategory = dbMeal.category ? dbMeal.category.toLowerCase() : "";
            const categoryMatch = (apiCategory === dbCategory) ? 1 : 0;  // Only compare apiCategory with dbCategory

            const weights = { ingredients: 0.3, calories: 0.2, servingSize: 0, name: 0.2, category: 0.4 };
        

          //  console.log("The similarity Score between",dbMeal.name,"and ",apiMeal.name,"is",ingredientSimilarity * weights.ingredients + calorieScore * weights.calories + nameScore * weights.name + categoryMatch*weights.category);

            return ingredientSimilarity * weights.ingredients + calorieScore * weights.calories + nameScore * weights.name + categoryMatch*weights.category;
        }
        

        const ingredientSetApi = convertIngredientsStringToArray(apiMeal.ingredients);
        const ingredientSetDb = dbMeal.ingredients;
   
        const ingredientSimilarity = jaccardSimilarity(ingredientSetApi, ingredientSetDb);
        const calorieScore = normalizedDifference(apiMeal.calories, dbMeal.calories, maxCalorieDifference);
        const servingSizeScore = normalizedDifference(apiMeal.servingSizeinGrams, dbMeal.serving_size, maxGramDifference);
        const nameScore = nameSimilarity(apiMeal.name, dbMeal.name);
        
        // Simplified category matching: directly comparing API meal category with DB meal category
        const apiCategory = apiMeal.category ? apiMeal.category.toLowerCase() : "";
        const dbCategory = dbMeal.category ? dbMeal.category.toLowerCase() : "";
        const categoryMatch = (apiCategory === dbCategory) ? 1 : 0;  // Only compare apiCategory with dbCategory

        const weights = { ingredients: 0.3, calories: 0.2, servingSize: 0, name: 0.2, category: 0.4 };
        
       // return ingredientSimilarity * weights.ingredients + calorieScore * weights.calories + servingSizeScore * weights.servingSize + nameScore * weights.name;
        return ingredientSimilarity * weights.ingredients + calorieScore * weights.calories + nameScore * weights.name + categoryMatch*weights.category;
    }

// Function to find the best match 
function findBestMatch(mealList, mealSection, category) 
    {
        let highestScore = 0;
        let matchingMeal = null;
    
        mealList.forEach(dbMeal => {
            const score = calculateMealScore(mealSection, dbMeal, 50, 100, category); 
            if (score > highestScore) 
                {
                    highestScore = score;
                    matchingMeal = dbMeal;
                }
        });
    
        return matchingMeal;
    }

function findBestReplacement(nameToCompareWith, mealDataset, apiSuggestion, category) 
    {
        // Find how many meals in the mealDataset contain the "nameToCompareWith" in their name
        // Calculate meal score

        let highestScore = 0;
        let matchingMeal = null;


        for(let i = 0; i<mealDataset.length; i++)
            {
                let score = 0;
                if (mealDataset[i].name.includes(nameToCompareWith)) 
                    {
                        const dbIngredients = convertIngredientsStringToArray(mealDataset[i].ingredients);
                        const apiIngredients = convertIngredientsStringToArray(apiSuggestion.ingredients);

                    
                        // Calculate Jaccard similarity for ingredients
                        score += jaccardSimilarity(apiIngredients, dbIngredients) * 50; // Weight ingredient similarity more heavily

                        // Calculate normalized difference in calories
                        score += normalizedDifference(apiSuggestion.calories, mealDataset[i].calories, 100) * 25; // Adjust maxDifference as needed

                        if (score > highestScore) 
                            {
                                highestScore = score;
                                matchingMeal = mealDataset[i];
                            }
                    }
            }
            
     
        return matchingMeal;
    }

    module.exports = { containsAllergensOrExclusions, findBestMatch, findBestReplacement };
